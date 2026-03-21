const fs = require("fs");
const path = require("path");
const express = require("express");
const axios = require("axios");
const crypto = require("crypto");
const mongoose = require("mongoose");
const Form = require("./models/forms"); // Adjust path if your model is elsewhere
const formSchemas = require("./formSchemas"); // 🌟 Imported your predefined schemas!

const dynamicRouter = (app) => {
  const routesDir = path.join(__dirname, "routes");

  // --- ADDED DEBUG LOGS HERE ---
  if (fs.existsSync(routesDir)) {
    console.log(`\n📁 Scanning for route files in: ${routesDir}`);
    
    fs.readdirSync(routesDir).forEach((file) => {
      const routePath = path.join(routesDir, file);

      if (file.endsWith(".js")) {
        const routeName = file.replace(".js", "");
        const route = require(routePath);

        // Express Routers evaluate as functions
        if (typeof route === "function") {
          app.use(`/api/${routeName}`, route);
          console.log(`  ✅ Successfully registered route: /api/${routeName}`);
        } else {
          console.warn(`  ⚠️ Skipping file: ${file} (It does not export a valid Express Router. Did you forget 'module.exports = router;'?)`);
        }
      }
    });
    console.log(""); // Empty line for spacing
  } else {
    console.error(`\n❌ ERROR: Routes folder not found at ${routesDir}. Please create a 'routes' folder next to your server.js file!\n`);
  }
  // ------------------------------

  app.post("/predict", async (req, res) => {
    const { inputText, creator_id } = req.body; // Added creator_id

    // 🌟 1. Check if the Hugging Face Token is actually loaded
    if (!process.env.HF_TOKEN) {
      console.warn("⚠️ WARNING: HF_TOKEN is missing! The app will use Local Offline Mode.");
    }

    if (!inputText) {
      return res
        .status(400)
        .json({ error: "Please enter a description for your form." });
    }

    const systemPrompt = `You are an API that generates JSON form schemas. You must respond ONLY with a valid JSON object containing a "title" and a "fields" array. Do not include any conversation, markdown formatting (\`\`\`json), or explanations. If the user asks in Khmer, the label and placeholder values MUST be translated into Khmer.

    Format required:
    {
      "title": "Form Title Here",
      "fields": [
        { "id": 1, "label": "Full Name", "type": "text", "placeholder": "Enter your name" },
        { "id": 2, "label": "Email", "type": "email", "placeholder": "example@email.com" }
      ]
    }`;

    // Highly available fallback endpoints
    const endpointsToTry = [
        { 
          url: "https://router.huggingface.co/hf-inference/models/meta-llama/Llama-3.2-3B-Instruct/v1/chat/completions", 
          model: "meta-llama/Llama-3.2-3B-Instruct",
          type: "chat"
        },
        { 
          url: "https://router.huggingface.co/hf-inference/models/Qwen/Qwen2.5-7B-Instruct/v1/chat/completions", 
          model: "Qwen/Qwen2.5-7B-Instruct",
          type: "chat"
        }
    ];

    let responseData = null;
    let generatedText = "";
    let isFallback = false;

    // 🌟 ONLY try Hugging Face if the token exists
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
                      timeout: 10000 // 10 seconds before giving up
                  }
              );
              
              responseData = response.data;
              if (responseData.choices && responseData.choices[0] && responseData.choices[0].message) {
                  generatedText = responseData.choices[0].message.content;
              }
              console.log(`✅ Success! Form generated using ${endpoint.model}`);
              break; 
              
          } catch (error) {
              console.warn(`❌ Failed with ${endpoint.model}. Reason: ${error.response?.status} ${error.response?.statusText || error.message}`);
              responseData = null; 
              generatedText = "";
          }
      }
    }

    let generatedFields = [];
    let formTitle = "Generated Form";

    // 🌟 THE BULLETPROOF LOCAL FALLBACK
    // If Hugging Face failed OR the AI returned garbage, we use your local templates!
    if (!responseData || !generatedText) {
        console.warn("\n⚡ ALL AI ATTEMPTS FAILED. Engaging Intelligent Local Fallback!");
        isFallback = true;
        
        const inputLower = inputText.toLowerCase();

        // Match the user's text to your formSchemas.js
        if (inputLower.includes("អាពាហ៍ពិពាហ៍") || inputLower.includes("wedding")) {
            generatedFields = formSchemas["អាពាហ៍ពិពាហ៍"];
            formTitle = "ទម្រង់អាពាហ៍ពិពាហ៍";
        } else if (inputLower.includes("ចុះឈ្មោះ") || inputLower.includes("register")) {
            generatedFields = formSchemas["ចុះឈ្មោះសកម្មភាព"] || formSchemas.registration;
            formTitle = "ទម្រង់ចុះឈ្មោះសកម្មភាព";
        } else if (inputLower.includes("contact") || inputLower.includes("ទាក់ទង")) {
            generatedFields = formSchemas.contact;
            formTitle = "Contact Form";
        } else {
            // If they type something random, give them the general template
            generatedFields = formSchemas.general;
            formTitle = "General Form";
        }
    } else {
        // Parse the AI's JSON if it succeeded
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
            generatedFields = formSchemas.general;
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
};

module.exports = dynamicRouter;