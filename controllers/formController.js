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
    // 1. Extract EVERYTHING we might receive from EditForm.vue
    const {
      title,
      description,
      schema,
      template_id,
      typography,
      header_file, // 🌟 NEW
      cover_image, // 🌟 NEW
      theme_settings,
      is_published,
    } = req.body;

    // 2. Build the update object dynamically so we only update what is sent
    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (description !== undefined) updateData.description = description;
    if (schema !== undefined) updateData.schema = schema;
    if (template_id !== undefined) updateData.template_id = template_id;
    if (typography !== undefined) updateData.typography = typography;
    if (header_file !== undefined) updateData.header_file = header_file; // 🌟 NEW
    if (cover_image !== undefined) updateData.cover_image = cover_image; // 🌟 NEW
    if (theme_settings !== undefined)
      updateData.theme_settings = theme_settings;
    if (is_published !== undefined) updateData.is_published = is_published;

    // 3. Find the form and update it
    const updatedForm = await Form.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true },
    );

    if (!updatedForm) {
      return res.status(404).json({ error: "Form not found" });
    }

    // 4. Return success
    res.status(200).json({
      message: "Form updated successfully!",
      form: updatedForm,
    });
  } catch (error) {
    console.error("Update form error:", error);
    res.status(500).json({ error: "Internal Server Error. Failed to update." });
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
