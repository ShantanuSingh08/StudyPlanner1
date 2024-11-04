// routes/eventRoutes.js
const express = require('express');
const { getEvents, createEvent, deleteEvent } = require('../controllers/eventController');

const router = express.Router();

// Get events for a user
router.get('/:userId', getEvents);

// Create a new event
router.post('/', createEvent);

// Delete a new event
router.delete('/:eventId', deleteEvent);

module.exports = router;
