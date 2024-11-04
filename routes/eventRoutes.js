// routes/eventRoutes.js
const express = require('express');
const { getEvents, createEvent } = require('../controllers/eventController');

const router = express.Router();

// Get events for a user
router.get('/:userId', getEvents);

// Create a new event
router.post('/', createEvent);

module.exports = router;
