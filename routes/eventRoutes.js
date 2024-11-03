// routes/eventRoutes.js
const express = require('express');
const router = express.Router();
const { saveEvent, getEvents } = require('../controllers/eventController'); // Ensure correct import

// Define routes
router.post('/', saveEvent); // Ensure saveEvent is correctly imported
router.get('/:userId', getEvents); // Ensure getEvents is correctly imported

module.exports = router;
