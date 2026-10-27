const Admin = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const BodyType = require("../models/BodyTypeModel");
const mongoose = require("mongoose");

//admin
const adminCtrl = {
  registerAdmin: async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const admin = await Admin.findOne({ email });
      if (admin)
        return res.status(400).json({ msg: "Admin email already exists" });

      const passwordHash = await bcrypt.hash(password, 10);

      const newAdmin = new Admin({
        username,
        email,
        password: passwordHash,
      });

      console.log("Saving admin:", newAdmin);
      await newAdmin.save();
      res.json({ msg: "Admin registered successfully" });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  loginAdmin: async (req, res) => {
    try {
      const { email, password } = req.body;
      const admin = await Admin.findOne({ email });
      if (!admin) return res.status(400).json({ msg: "Admin not found" });

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) return res.status(400).json({ msg: "Incorrect password" });

      const token = jwt.sign(
        { id: admin._id, role: "admin" },
        process.env.TOKEN_SECRET,
        { expiresIn: "1d" }
      );
      res.json({
        token, // auth token
        admin: {
          // admin object
          _id: admin._id,
          username: admin.username,
          email: admin.email,
        },
      });
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  getAdminById: async (req, res) => {
    try {
      const admin = await Admin.findById(req.params.id).select("-password"); // exclude password
      if (!admin) return res.status(404).json({ msg: "Admin not found" });
      res.json(admin);
    } catch (err) {
      res.status(500).json({ msg: err.message });
    }
  },

  updateAdmin: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      const updateData = { username, email };

      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updateData.password = hashedPassword;
      }

      const updatedAdmin = await Admin.findByIdAndUpdate(
        req.params.id,
        updateData,
        { new: true }
      );

      if (!updatedAdmin)
        return res.status(404).json({ msg: "Admin not found" });

      res.json({ msg: "Profile has been updated", user: updatedAdmin });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  deleteAdmin: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Admin ID is required" });
      }

      // Delete all meals assigned to that user first
      await BodyType.deleteMany({ user_id: id });

      const admin = await Admin.findByIdAndDelete(id);

      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      return res.json({ message: "🗑️ Account deleted successfully!" });
    } catch (err) {
      console.error("Delete user error:", err);
      res.status(500).json({
        message: "Server error while deleting user",
        error: err.message,
      });
    }
  },
};

module.exports = adminCtrl;
