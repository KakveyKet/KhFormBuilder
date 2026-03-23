const Form = require("../models/forms"); // Assuming you have a models/form.js file

// Create a new form
exports.createForm = async (req, res) => {
  try {
    const newForm = new Form(req.body);
    await newForm.save();
    res.status(201).json(newForm);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all forms
exports.getForms = async (req, res) => {
  try {
    const forms = await Form.find();
    res.status(200).json(forms);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get a single form by ID
exports.getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id).populate("creator_id");
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(form);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update a form
exports.updateForm = async (req, res) => {
  try {
    const updatedForm = await Form.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      
    });
    if (!updatedForm) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json(updatedForm);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete a form
exports.deleteForm = async (req, res) => {
  try {
    const deletedForm = await Form.findByIdAndDelete(req.params.id);
    if (!deletedForm) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({ message: "Form deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
