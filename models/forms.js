const mongoose = require("mongoose");

// Reusable sub-schema for text editor styling properties
const textStyleSchema = new mongoose.Schema(
  {
    align: {
      type: String,
      enum: ["left", "center", "right", "justify"],
      default: "left",
    },
    color: { type: String, default: "" },
    decoration: {
      type: String,
      enum: ["none", "underline", "line-through"],
      default: "none",
    },
    weight: {
      type: String,
      enum: ["normal", "bold", "bolder", "lighter"],
      default: "normal",
    },
    style: { type: String, enum: ["normal", "italic"], default: "normal" },
    size: { type: String, default: "" },
  },
  { _id: false },
);

const formSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },

    typography: {
      title: { type: textStyleSchema, default: () => ({}) },
      description: { type: textStyleSchema, default: () => ({}) },
    },

    creator_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    template_id: { type: String, default: "minimal-light" },
    schema: { type: mongoose.Schema.Types.Mixed, required: true },
    theme_settings: { type: mongoose.Schema.Types.Mixed },

    is_published: { type: Boolean, default: false },
    public_hash: { type: String, unique: true, required: true },
    views: { type: Number, default: 0 },

    // NOTE: We removed the manual created_at / updated_at fields here...
  },
  {
    // 🌟 FIXED: ...and let Mongoose handle them automatically and safely here!
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  },
);

const Form = mongoose.model("Form", formSchema);
module.exports = Form;
