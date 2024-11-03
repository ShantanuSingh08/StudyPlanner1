// routes/eventRoutes.js

const express = require('express');
const { saveEvent, getUserEvents } = require('../controllers/eventController');

const router = express.Router();

// Route to save an event
router.post('/:userId', saveEvent);

// Route to get all events for a user
router.get('/:userId', getUserEvents);

module.exports = router;
