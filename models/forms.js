const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  creator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  schema: { type: mongoose.Schema.Types.Mixed, required: true }, // Store JSON data for dynamic form schema
  theme_settings: { type: mongoose.Schema.Types.Mixed }, // Store theme settings as JSON
  is_published: { type: Boolean, default: false },
  public_hash: { type: String, unique: true, required: true },
  views: { type: Number, default: 0 },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
