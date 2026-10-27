const mongoose = require("mongoose");

const bodyTypeSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    height: { type: Number, required: true, min: 1 },
    weight: { type: Number, required: true, min: 1 },
    age: { type: Number, required: true, min: 1 },
    gender: { type: String, required: true },
    goal: { type: String, required: true },
    blood_group: { type: String, required: true },
    diet_type: { type: String, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }, // if linked to user
  },
  { timestamps: true }
);

module.exports = mongoose.model("BodyType", bodyTypeSchema);
