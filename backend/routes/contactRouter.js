const express = require("express");
const router = express.Router();
const Contact = require("../models/contactModel");

// POST Contact
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.status(201).json({ message: "Contact saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving contact", error });
  }
});

// Get all contacts
router.get("/", async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: "Error fetching contacts", err });
  }
});

// Delete a contact
router.delete("/:id", async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Contact deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting contact", err });
  }
});

module.exports = router;
