const BodyType = require("../models/BodyTypeModel");

const bodyTypeCtrl = {
  addOrUpdateBodyType: async (req, res) => {
    try {
      const {
        username,
        height,
        weight,
        age,
        gender,
        goal,
        blood_group,
        diet_type,
        userId,
      } = req.body;

      if (
        !username ||
        !height ||
        !weight ||
        !age ||
        !gender ||
        !goal ||
        !blood_group ||
        !diet_type
      ) {
        return res.status(400).json({ message: "All fields are required." });
      }
      if (height <= 0 || weight <= 0 || age <= 0) {
        return res
          .status(400)
          .json({
            message: "Height, Weight and Age must be positive numbers.",
          });
      }

      const existing = await BodyType.findOne({ userId });
      if (existing) {
        return res.json({
          message: "Data already exists, please use update route.",
        });
      }

      const newBodyType = new BodyType({
        username,
        height,
        weight,
        age,
        gender,
        goal,
        blood_group,
        diet_type,
        userId,
      });
      await newBodyType.save();
      res.json({ message: "Data saved successfully!", bodyType: newBodyType });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  getBodyTypeByUser: async (req, res) => {
    try {
      const { userId } = req.params;
      const bodyType = await BodyType.findOne({ userId });
      if (!bodyType)
        return res.status(404).json({ message: "No Body Type found." });
      res.json(bodyType);
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },

  // ✅ New Update Controller
  updateBodyType: async (req, res) => {
    try {
      const { userId } = req.params;
      const {
        username,
        height,
        weight,
        age,
        gender,
        goal,
        blood_group,
        diet_type,
      } = req.body;

      if (
        !username ||
        !height ||
        !weight ||
        !age ||
        !gender ||
        !goal ||
        !blood_group ||
        !diet_type
      ) {
        return res.status(400).json({ message: "All fields are required." });
      }
      if (height <= 0 || weight <= 0 || age <= 0) {
        return res
          .status(400)
          .json({
            message: "Height, Weight, and Age must be positive numbers.",
          });
      }

      const updated = await BodyType.findOneAndUpdate(
        { userId },
        { username, height, weight, age, gender, goal, blood_group, diet_type },
        { new: true }
      );

      if (!updated) {
        return res.status(404).json({ message: "No record found to update." });
      }

      res.json({ message: "Data updated successfully!", bodyType: updated });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  },
};

module.exports = bodyTypeCtrl;
