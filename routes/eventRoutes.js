// routes/eventRoutes.js

const express = require('express');
const { createEvent, getEvents } = require('../controllers/eventController');
const router = express.Router();

router.post('/', createEvent);
router.get('/:userId', getEvents);

module.exports = router;
