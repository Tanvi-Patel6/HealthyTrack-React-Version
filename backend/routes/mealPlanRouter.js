// routes/mealPlanRoutes.js
const express = require('express');
const router = express.Router();
const MealPlan = require('../models/MealModel');

// GET meal plans for a specific user
router.get('/:userId', async (req, res) => {
    try {
        const { userId } = req.params;

        // Find all meal plans for this user
        const mealPlans = await MealPlan.find({ user_id: userId });

        if (!mealPlans.length) {
            return res.status(404).json({ message: 'No meal plans found for this user' });
        }

        res.json(mealPlans);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
