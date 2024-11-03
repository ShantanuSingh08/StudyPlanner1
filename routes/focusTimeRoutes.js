// focusTimeRoutes.js

const express = require('express');
const router = express.Router();
const focusTimeController = require('../controllers/focusTimeController');

// Route to save focus time
router.post('/', focusTimeController.saveFocusTime);

// Route to get focus times for a specific user
router.get('/:userId', focusTimeController.getFocusTimes);

module.exports = router;

