const fs = require("fs");
const path = require("path");
const express = require("express");
const axios = require("axios");

const dynamicRouter = (app) => {
  const routesDir = path.join(__dirname, "routes");

  // Loop through the files in the routes directory
  if (fs.existsSync(routesDir)) {
    fs.readdirSync(routesDir).forEach((file) => {
      const routePath = path.join(routesDir, file);

      if (file.endsWith(".js")) {
        const routeName = file.replace(".js", "");
        const route = require(routePath);

        if (typeof route === "function") {
          app.use(`/api/${routeName}`, route);
        } else {
          console.warn(`Skipping invalid route file: ${file}`);
        }
      }
    });
  }

  app.post("/predict", async (req, res) => {
    const { inputText } = req.body;

    if (!inputText) {
      return res
        .status(400)
        .json({ error: "Please enter a description for your form." });
    }

    try {
      // 🌟 NEW: Switched to a Multilingual Zero-Shot Model that understands Khmer!
      const response = await axios.post(
        "https://router.huggingface.co/hf-inference/models/MoritzLaurer/mDeBERTa-v3-base-mnli-xnli",
        {
          inputs: inputText,
          parameters: {
            // Added Khmer categories alongside English ones
            candidate_labels: [
              "registration",
              "contact",
              "feedback",
              "general",
              "អាពាហ៍ពិពាហ៍", // Wedding
              "ចុះឈ្មោះសកម្មភាព", // Activity Registration
            ],
          },
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.HF_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );

      const responseData = response.data;

      if (responseData && responseData.error) {
        console.warn("Hugging Face API Warning:", responseData.error);
        const errorMsg =
          typeof responseData.error === "string"
            ? responseData.error
            : JSON.stringify(responseData.error);
        return res.status(503).json({ error: `Hugging Face API: ${errorMsg}` });
      }

      let topCategory = "general";

      // Parse the response
      if (
        Array.isArray(responseData) &&
        responseData.length > 0 &&
        responseData[0].label
      ) {
        topCategory = responseData[0].label;
      } else if (
        responseData &&
        responseData.labels &&
        Array.isArray(responseData.labels)
      ) {
        topCategory = responseData.labels[0];
      } else if (
        Array.isArray(responseData) &&
        responseData[0] &&
        responseData[0].labels
      ) {
        topCategory = responseData[0].labels[0];
      } else {
        console.error(
          "Unexpected API Response format:",
          JSON.stringify(response.data, null, 2),
        );
        return res.status(500).json({
          error:
            "Received an unexpected response format from Hugging Face API.",
        });
      }

      // Friendly response (handles English or Khmer intent)
      const predictedSentence = `I understand you need a [ ${topCategory} ] form. Here is a template for that!`;

      // Define the form templates (Added Khmer templates)
      const formSchemas = {
        registration: [
          { id: 1, label: "Full Name", type: "text", placeholder: "John Doe" },
          {
            id: 2,
            label: "Email Address",
            type: "email",
            placeholder: "john@example.com",
          },
          {
            id: 3,
            label: "Password",
            type: "password",
            placeholder: "********",
          },
        ],
        contact: [
          { id: 1, label: "Name", type: "text", placeholder: "Your Name" },
          { id: 2, label: "Email", type: "email", placeholder: "Your Email" },
          {
            id: 3,
            label: "Message",
            type: "text",
            placeholder: "How can we help?",
          },
        ],
        feedback: [
          { id: 1, label: "Rating (1-5)", type: "number", placeholder: "5" },
          {
            id: 2,
            label: "Suggestions",
            type: "text",
            placeholder: "Tell us more...",
          },
        ],
        general: [
          {
            id: 1,
            label: "Title",
            type: "text",
            placeholder: "Enter title here",
          },
          {
            id: 2,
            label: "Description",
            type: "text",
            placeholder: "Enter details...",
          },
        ],
        // 🌟 NEW KHMER TEMPLATES:
        អាពាហ៍ពិពាហ៍: [
          {
            id: 1,
            label: "ឈ្មោះភ្ញៀវ",
            type: "text",
            placeholder: "បញ្ចូលឈ្មោះរបស់អ្នក...",
          },
          {
            id: 2,
            label: "លេខទូរស័ព្ទ",
            type: "text",
            placeholder: "០១២ ៣៤៥ ៦៧៨",
          },
          {
            id: 3,
            label: "ចំនួនអ្នកចូលរួម",
            type: "number",
            placeholder: "ឧទាហរណ៍៖ ២",
          },
          {
            id: 4,
            label: "ចំណងដៃ / សារជូនពរ",
            type: "text",
            placeholder: "សរសេរសាររបស់អ្នកនៅទីនេះ...",
          },
        ],
        ចុះឈ្មោះសកម្មភាព: [
          {
            id: 1,
            label: "ឈ្មោះពេញ",
            type: "text",
            placeholder: "បញ្ចូលឈ្មោះពេញ...",
          },
          { id: 2, label: "ភេទ", type: "text", placeholder: "ប្រុស / ស្រី" },
          {
            id: 3,
            label: "លេខទូរស័ព្ទ",
            type: "text",
            placeholder: "០១២ ៣៤៥ ៦៧៨",
          },
          {
            id: 4,
            label: "អ៊ីមែល",
            type: "email",
            placeholder: "example@email.com",
          },
        ],
      };

      // Assign the generated fields based on the AI's category
      let generatedFields = formSchemas[topCategory] || formSchemas.general;

      res.json({
        prediction: predictedSentence,
        fields: generatedFields,
      });
    } catch (error) {
      const hfError =
        error.response?.data?.error || error.response?.data || error.message;
      console.error("Hugging Face API Error:", hfError);
      res.status(500).json({
        error: typeof hfError === "string" ? hfError : JSON.stringify(hfError),
      });
    }
  });
};

module.exports = dynamicRouter;
