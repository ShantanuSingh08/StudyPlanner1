// focusTimeRoutes.js

const express = require('express');
const { saveFocusTime, getFocusTimes } = require('../controllers/focusTimeController');

const router = express.Router();

// Route to save focus time
router.post('/api/focus-time', saveFocusTime);

// Route to get focus times for a specific user
router.get('/api/focus-time/:userId', getFocusTimes);

module.exports = router;
