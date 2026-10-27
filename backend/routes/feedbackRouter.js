const express = require("express");
const router = express.Router();
const Feedback = require("../models/feedbackModel");

// POST Feedback
router.post("/", async (req, res) => {
  try {
    const { name, email, feedback } = req.body;
    const newFeedback = new Feedback({ name, email, feedback });
    await newFeedback.save();
    res.status(201).json({ message: "Feedback saved successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error saving feedback", error });
  }
});

// Get all feedbacks
router.get("/", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.status(200).json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: "Error fetching feedbacks", err });
  }
});

// Delete a feedback
router.delete("/:id", async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Feedback deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting feedback", err });
  }
});

module.exports = router;
