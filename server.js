const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const dynamicRouter = require("./dynamicRouter"); // Import the dynamic router
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Load environment variables from .env file
dotenv.config();

// Middleware
app.use(express.json()); // To parse JSON bodies

// Load routes dynamically
dynamicRouter(app); // Register dynamic routes including /predict

// MongoDB connection
mongoose
  .connect("mongodb://localhost:27017/formBuilder")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Start the server
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
