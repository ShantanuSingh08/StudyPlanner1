// routes/eventRoutes.js
const express = require('express');
const { saveEvent, getEvents } = require('../controllers/eventController');

const router = express.Router();

// Route to save an event for a specific user
router.post('/:userId', saveEvent);

// Route to get events for a specific user
router.get('/:userId', getEvents);

module.exports = router;
