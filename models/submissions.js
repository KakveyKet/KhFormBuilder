const mongoose = require("mongoose");

const submissionSchema = new mongoose.Schema({
  form_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true,
  },
  answers: { type: mongoose.Schema.Types.Mixed, required: true }, // JSONB equivalent
  submitted_at: { type: Date, default: Date.now },
});

const Submission = mongoose.model("Submission", submissionSchema);

module.exports = Submission;
