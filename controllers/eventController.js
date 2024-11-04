// controllers/eventController.js
const Event = require('../models/Event');

// Get events for a specific user
const getEvents = async (req, res) => {
  try {
    const events = await Event.find({ userId: req.params.userId });
    res.json(events);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new event
const createEvent = async (req, res) => {
  const { userId, title, start, end, color, allDay } = req.body;

  const newEvent = new Event({
    userId,
    title,
    start,
    end,
    color,
    allDay,
  });

  try {
    const savedEvent = await newEvent.save();
    res.status(201).json(savedEvent);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = { getEvents, createEvent };
