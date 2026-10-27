const express = require('express');
const router = express.Router();
const bodyTypeCtrl = require('../controllers/BodyTypeCtrl');

// Save or update (POST)
router.post('/', bodyTypeCtrl.addOrUpdateBodyType);

// Get by userId (GET)
router.get('/:userId', bodyTypeCtrl.getBodyTypeByUser);

// Update existing record (PUT)
router.put('/:userId', bodyTypeCtrl.updateBodyType);

module.exports = router;
