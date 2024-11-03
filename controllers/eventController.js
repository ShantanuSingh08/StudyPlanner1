// controllers/eventController.js

const Event = require('../models/Event');

// Create a new event
const createEvent = async (req, res) => {
  const { userId, title, start, end, color } = req.body;

  try {
    const newEvent = new Event({ userId, title, start, end, color });
    await newEvent.save();
    return res.status(201).json({ message: 'Event created successfully', data: newEvent });
  } catch (error) {
    console.error('Error creating event:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Get all events for a user
const getEvents = async (req, res) => {
  const { userId } = req.params;

  try {
    const events = await Event.find({ userId });
    return res.status(200).json(events);
  } catch (error) {
    console.error('Error retrieving events:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = { createEvent, getEvents };
