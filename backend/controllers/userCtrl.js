const Users = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Meal = require("../models/MealModel");
const BodyType = require("../models/BodyTypeModel");
const Contact = require("../models/contactModel");
const Feedback = require("../models/feedbackModel");
const mongoose = require("mongoose");

const userCtrl = {
  registerUser: async (req, res) => {
    try {
      // Find the last user to get max id
      const lastUser = await Users.findOne().sort({ id: -1 });
      const nextId = lastUser ? lastUser.id + 1 : 1;

      const { username, email, password } = req.body;
      const user = await Users.findOne({ email: email });
      if (user) {
        return res.status(400).json({ msg: "The email already exist" });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      // res.json({passwordHash})
      // res.json({msg:"signup sucessfull"})
      const newUser = new Users({
        id: nextId,
        username: username,
        email: email,
        password: passwordHash,
      });
      // res.json(newUser)
      await newUser.save();
      res.json({ msg: "Register sucessfull" });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  loginUser: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await Users.findOne({ email: email });
      if (!user) return res.status(400).json({ msg: "user does not exist." });

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect Password" });

      // if login sucessfull creating TokenExpiredError
      const payload = { id: user._id, numericId: user.id, name: user.username };
      const token = jwt.sign(payload, process.env.TOKEN_SECRET, {
        expiresIn: "1d",
      });

      // ✅ Return both token and userId
      res.json({
        token,
        userId: user._id, // this is what frontend needs
        name: user.username, // optional, for showing user name
        email: user.email,
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },
  verifiedToken: async (req, res) => {
    try {
      const token = req.header("Authorization");
      if (!token) return res.send(false);

      jwt.verify(token, process.env.TOKEN_SECRET, async (err, verfied) => {
        if (err) return res.send(false);

        const user = await Users.findById(verfied.id);

        if (!user) return res.send(false);
        return res.send(true);
      });
    } catch (err) {
      res.status(400).json({ msg: err.message });
    }
  },

  getUserById: async (req, res) => {
    try {
      const user = await Users.findById(req.params.id).select("-password"); // exclude password
      if (!user) return res.status(404).json({ msg: "User not found" });
      res.json(user);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  updateUser: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const updateData = { username, email };

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
      }

      const updatedUser = await Users.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updatedUser) return res.status(404).json({ msg: "User not found" });

      await BodyType.updateMany(
        { userId: req.params.id },
        { username: updateData.username }
      );

      res.json({ msg: "Profile has been updated", user: updatedUser });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "User ID is required" });
      }

      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid user ID format" });
      }

      // Convert string to ObjectId
      const objectId = new mongoose.Types.ObjectId(id);

      // Find the user first to get their email before deleting
      const user = await Users.findById(objectId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const userEmail = user.email;

      // Delete all associated data before deleting the user
      // Delete all meal plans assigned to that user
      await Meal.deleteMany({ user_id: objectId });

      // Delete all body type records for that user
      await BodyType.deleteMany({ userId: objectId });

      // Delete all contact forms associated with that user's email
      await Contact.deleteMany({ email: userEmail });

      // Delete all feedback forms associated with that user's email
      await Feedback.deleteMany({ email: userEmail });

      // Finally, delete the user
      await Users.findByIdAndDelete(objectId);

      return res.json({
        message: "🗑️ Account deleted successfully along with all user data!",
      });
    } catch (err) {
      console.error("Delete user error:", err);
      return res.status(500).json({
        message: "Server error while deleting user",
        error: err.message,
      });
    }
  },
};

module.exports = userCtrl;
