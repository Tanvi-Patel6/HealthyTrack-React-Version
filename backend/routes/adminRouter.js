const router = require("express").Router();
const adminCtrl = require("../controllers/adminCtrl");
const User = require("../models/userModel");
const Admin = require("../models/adminModel");
const Meal = require("../models/MealModel");
const BodyType = require("../models/BodyTypeModel");
const auth = require("../middleware/auth");
const mongoose = require("mongoose");
const Contact = require("../models/contactModel");
const Feedback = require("../models/feedbackModel");

// Admin Register
router.post("/register", adminCtrl.registerAdmin);

// Admin Login
router.post("/login", adminCtrl.loginAdmin);

// Get total counts
router.get("/dashboard-counts", async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAdmins = await Admin.countDocuments();
    const totalMealPlans = await Meal.countDocuments();
    const totalBodyForms = await BodyType.countDocuments();

    res.json({ totalUsers, totalAdmins, totalBodyForms, totalMealPlans });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get recent admins
router.get("/recent-admins", async (req, res) => {
  try {
    const admins = await Admin.find().sort({ createdAt: -1 }).limit(2);
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get all the admins
router.get("/all-admins", async (req, res) => {
  try {
    const admins = await Admin.find().sort({ createdAt: -1 });
    res.json(admins);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE admin by id
router.delete("/admins/:id", async (req, res) => {
  try {
    const loggedInAdminId = req.header("Authorization"); // token based check
    if (loggedInAdminId === req.params.id) {
      return res.status(400).json({ msg: "You cannot delete yourself" });
    }

    const deletedAdmin = await Admin.findByIdAndDelete(req.params.id);
    if (!deletedAdmin) return res.status(404).json({ msg: "Admin not found" });

    res.json({ msg: "Admin deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get recent users
router.get("/recent-users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 }).limit(2);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Get all users
router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get recent body type forms
router.get("/recent-bodyforms", async (req, res) => {
  try {
    const forms = await BodyType.find().sort({ createdAt: -1 }).limit(1);
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get all body type forms
router.get("/bodyforms", async (req, res) => {
  try {
    const forms = await BodyType.find().sort({ createdAt: -1 });
    res.json(forms);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Delete user + all related data
router.delete("/delete-user/:id", async (req, res) => {
  try {
    const userId = req.params.id;

    // Find user first
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const userEmail = user.email; // Needed for deleting form data

    // 1. Delete all meal plans for this user
    await Meal.deleteMany({ user_id: userId });

    // 2. Delete all body type data for this user
    await BodyType.deleteMany({ userId: userId });

    // 3. Delete all contact forms submitted with this user's email
    await Contact.deleteMany({ email: userEmail });

    // 4. Delete all feedback submitted with this user's email
    await Feedback.deleteMany({ email: userEmail });

    // 5. Finally delete the user
    await User.findByIdAndDelete(userId);

    res.json({ message: "User and all related data deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST assign meal
router.post("/assign-meal", async (req, res) => {
  try {
    const {
      user_id,
      meal_name,
      calories,
      protein,
      carbs,
      fats,
      meal_day,
      meal_time,
    } = req.body;

    // Validation
    if (!user_id || !meal_name || !meal_day || !meal_time)
      return res.status(400).json({ msg: "Please fill all required fields" });

    const newMeal = new Meal({
      user_id,
      meal_name,
      calories,
      protein,
      carbs,
      fats,
      meal_day,
      meal_time,
    });
    await newMeal.save();
    res.status(201).json({ msg: "Meal assigned successfully", meal: newMeal });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET all meals
router.get("/meals", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 0; // 0 means no limit
    const page = parseInt(req.query.page) || 1;

    const skip = (page - 1) * limit;

    let query = Meal.find()
      .populate("user_id", "username email")
      .sort({ createdAt: -1 });

    // ✅ Apply pagination only if limit > 0
    if (limit > 0) {
      query = query.skip(skip).limit(limit);
    }

    const meals = await query.exec();

    res.json(meals);
  } catch (err) {
    console.error("Error fetching meals:", err);
    res.status(500).json({ message: "Error fetching meals" });
  }
});

// PUT edit meal
router.put("/meals/:id", async (req, res) => {
  try {
    const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedMeal) return res.status(404).json({ msg: "Meal not found" });
    res.json({ msg: "Meal updated", meal: updatedMeal });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// DELETE meal
router.delete("/meals/:id", async (req, res) => {
  try {
    const meal = await Meal.findByIdAndDelete(req.params.id);
    if (!meal) return res.status(404).json({ msg: "Meal not found" });
    res.json({ msg: "Meal deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// GET meals/:userId
router.get("/meals/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Find meals where user_id matches the userId
    const meals = await Meal.find({ user_id: userId }).sort({ createdAt: -1 });

    res.json(meals);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get user by ID
router.get("/:id", adminCtrl.getAdminById);

router.put("/update/:id", adminCtrl.updateAdmin);

router.delete("/delete/:id", adminCtrl.deleteAdmin);

module.exports = router;
