const mongoose = require("mongoose");

const MealSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    meal_name: { type: String, required: true },
    calories: { type: Number, default: 0 },
    protein: { type: Number, default: 0 },
    carbs: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
    meal_day: { type: String, required: true },
    meal_time: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Meal", MealSchema);
