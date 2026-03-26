const fs = require("fs");
const path = require("path");
const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Form = require("./models/forms"); 
const User = require("./models/users"); // 🌟 NEW: Import your User model!
const matchTemplate = require("./utils/templateMatcher"); // 🌟 Import our fallback utility!
const buildSystemPrompt = require("./utils/systemPrompt"); // 🌟 Import the dynamic prompt builder!

const dynamicRouter = (app) => {
  const routesDir = path.join(__dirname, "routes");

  if (fs.existsSync(routesDir)) {
    console.log(`\n📁 Scanning for route files in: ${routesDir}`);
    
    fs.readdirSync(routesDir).forEach((file) => {
      const routePath = path.join(routesDir, file);

      if (file.endsWith(".js")) {
        const routeName = file.replace(".js", "");
        const route = require(routePath);

        if (typeof route === "function") {
          app.use(`/api/${routeName}`, route);
          console.log(`  ✅ Successfully registered route: /api/${routeName}`);
        } else {
          console.warn(`  ⚠️ Skipping file: ${file}`);
        }
      }
    });
    console.log(""); 
  } else {
    console.error(`\n❌ ERROR: Routes folder not found at ${routesDir}.\n`);
  }

  app.post("/predict", async (req, res) => {
    const { inputText, creator_id } = req.body; 

    // 🌟 NEW: 1. Validate User and Check Tokens BEFORE asking the AI
    let user = null;
    if (creator_id) {
      try {
        user = await User.findById(creator_id);
        if (!user) {
          return res.status(404).json({ error: "User not found in the database." });
        }
        
        // 🌟 UPDATED: Admins get unlimited tokens! Only block if they are NOT an admin.
        if (user.role !== "admin" && user.tokens_used >= user.form_token) {
          return res.status(403).json({ 
            error: "Token limit reached. You have used all of your tokens! Please upgrade to generate more." 
          });
        }
      } catch (err) {
        return res.status(400).json({ error: "Invalid user ID format." });
      }
    }

    if (!process.env.HF_TOKEN) {
      console.warn("⚠️ WARNING: HF_TOKEN is missing! The app will use Local Offline Mode.");
    }

    if (!inputText) {
      return res.status(400).json({ error: "Please enter a description for your form." });
    }

    // 🌟 Call the function from your utility file!
    const systemPrompt = buildSystemPrompt();

    // 🌟 COMPLETELY FREE & OPEN MODELS FOR TESTING
    const endpointsToTry = [
        { 
          url: "https://router.huggingface.co/hf-inference/models/mistralai/Mistral-7B-Instruct-v0.3/v1/chat/completions", 
          model: "mistralai/Mistral-7B-Instruct-v0.3",
          type: "chat"
        },
        { 
          url: "https://router.huggingface.co/hf-inference/models/HuggingFaceH4/zephyr-7b-beta/v1/chat/completions", 
          model: "HuggingFaceH4/zephyr-7b-beta",
          type: "chat"
        }
    ];

    let responseData = null;
    let generatedText = "";
    let isFallback = false;

    if (process.env.HF_TOKEN) {
      for (const endpoint of endpointsToTry) {
          try {
              console.log(`\n⏳ Requesting AI Generation...`);
              console.log(`📍 Trying URL: ${endpoint.url}`);
              
              const response = await axios.post(
                  endpoint.url,
                  {
                      model: endpoint.model,
                      messages: [
                          { role: "system", content: systemPrompt },
                          { role: "user", content: inputText }
                      ],
                      max_tokens: 1024,
                      temperature: 0.1,
                  },
                  {
                      headers: {
                          Authorization: `Bearer ${process.env.HF_TOKEN}`,
                          "Content-Type": "application/json",
                      },
                      timeout: 15000 // Give it 15 seconds for the free tier
                  }
              );
              
              responseData = response.data;
              if (responseData.choices && responseData.choices[0] && responseData.choices[0].message) {
                  generatedText = responseData.choices[0].message.content;
              }
              console.log(`✅ Success! Form generated using ${endpoint.model}`);
              break; 
              
          } catch (error) {
              const status = error.response?.status;
              console.warn(`❌ Failed with ${endpoint.model}. Reason: ${status} ${error.response?.statusText || error.message}`);
              
              // 🌟 403 DIAGNOSTIC WARNING: Exactly how to fix the Token Permissions!
              if (status === 403) {
                  console.warn(`\n🛑 403 FORBIDDEN ERROR DETECTED:`);
                  console.warn(`Your Hugging Face token is valid, but it DOES NOT have permission to use the Inference API.`);
                  console.warn(`To fix this:`);
                  console.warn(`1. Go to https://huggingface.co/settings/tokens`);
                  console.warn(`2. Click 'Edit' next to your token (or click 'Create new token' -> 'Fine-grained')`);
                  console.warn(`3. Scroll down to "Inference" and CHECK the box for "Make calls to the serverless Inference API"`);
                  console.warn(`4. Save it, update your .env file if it's a new token, and restart this Node server.\n`);
              }

              responseData = null; 
              generatedText = "";
          }
      }
    }

    let generatedFields = [];
    let formTitle = "Generated Form";

    // 🌟 LOCAL FALLBACK
    if (!responseData || !generatedText) {
        console.warn("\n⚡ ALL AI ATTEMPTS FAILED. Engaging Intelligent Local Fallback!");
        isFallback = true;
        
        // Use our utility function to keep the router clean!
        const matchedData = matchTemplate(inputText);
        generatedFields = matchedData.fields;
        formTitle = matchedData.title;

    } else {
        try {
            let cleanJsonString = generatedText.trim();
            if (cleanJsonString.startsWith("```json")) cleanJsonString = cleanJsonString.replace(/^```json/, "");
            if (cleanJsonString.startsWith("```")) cleanJsonString = cleanJsonString.replace(/^```/, "");
            if (cleanJsonString.endsWith("```")) cleanJsonString = cleanJsonString.replace(/```$/, "");
            
            const generatedData = JSON.parse(cleanJsonString.trim());
            
            if (Array.isArray(generatedData)) {
                generatedFields = generatedData;
            } else if (generatedData.fields) {
                generatedFields = generatedData.fields;
                formTitle = generatedData.title || formTitle;
            }
        } catch (error) {
            console.warn("❌ AI JSON Parsing failed. Engaging Local Fallback!");
            isFallback = true;
            
            const matchedData = matchTemplate(inputText);
            generatedFields = matchedData.fields;
            formTitle = matchedData.title;
        }
    }

    // 🌟 GUARANTEED DATABASE SAVE
    try {
      const publicHash = crypto.randomBytes(6).toString("hex");
      const validCreatorId = creator_id || new mongoose.Types.ObjectId();

      const newForm = new Form({
        title: formTitle,
        description: inputText,
        creator_id: validCreatorId,
        schema: generatedFields,
        public_hash: publicHash
      });

      await newForm.save();

      // 🌟 NEW: 2. Deduct Token and Link Form to User
      if (user) {
        user.tokens_used += 1; // Consume 1 token
        user.form_ids.push(newForm._id); // Save the form ID to the user's profile
        await user.save();
        console.log(`✅ Token used! User now has ${user.form_token - user.tokens_used} tokens remaining.`);
      }

      res.json({
        prediction: isFallback 
            ? `Offline Mode: Automatically loaded template for "${inputText}"` 
            : `AI successfully generated a custom form based on: "${inputText}"`,
        fields: generatedFields,
        form_id: newForm._id,
        public_hash: publicHash
      });

    } catch (error) {
      console.error("Database error:", error.message);
      res.status(500).json({ error: "Internal Server Error during database save." });
    }
  });

  // GET route
  app.get("/api/forms/:id", async (req, res) => {
    try {
      const form = await Form.findById(req.params.id);
      if (!form) return res.status(404).json({ error: "Form not found" });
      res.json(form);
    } catch (error) {
      res.status(500).json({ error: "Internal Server Error. Invalid ID format." });
    }
  });

  // PUT route
    app.put("/api/forms/:id", async (req, res) => {
    try {
      // 🌟 Extract all properties from the frontend
      const { 
        title, 
        description, 
        schema, 
        template_id, 
        typography, 
        theme_settings, 
        is_published,
        header_file,   // 🌟 From previous step
        cover_image    // 🌟 NEW: Cover image support
      } = req.body;
      
      const updateData = {};
      if (title !== undefined) updateData.title = title;
      if (description !== undefined) updateData.description = description;
      if (schema !== undefined) updateData.schema = schema;
      if (template_id !== undefined) updateData.template_id = template_id;
      if (typography !== undefined) updateData.typography = typography;
      if (theme_settings !== undefined) updateData.theme_settings = theme_settings;
      if (is_published !== undefined) updateData.is_published = is_published;
      if (header_file !== undefined) updateData.header_file = header_file;
      if (cover_image !== undefined) updateData.cover_image = cover_image;

      const updatedForm = await Form.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true } 
      );
      
      if (!updatedForm) return res.status(404).json({ error: "Form not found" });
      res.json({ message: "Form updated successfully!", form: updatedForm });
    } catch (error) {
      console.error("Update error:", error);
      res.status(500).json({ error: "Internal Server Error. Failed to update." });
    }
  });
};

module.exports = dynamicRouter;