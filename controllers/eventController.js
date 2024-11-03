// controllers/eventController.js
const createEventModel = require('../models/eventModel');

// Save an event for a specific user
const saveEvent = async (req, res) => {
  const { userId, title, start, end } = req.body;

  try {
    const Event = createEventModel(userId); // Create the dynamic model

    const newEvent = new Event({ title, start, end });
    await newEvent.save();

    return res.status(201).json({ message: 'Event saved successfully', data: newEvent });
  } catch (error) {
    console.error('Error saving event:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Get events for a specific user
const getEvents = async (req, res) => {
  const { userId } = req.params;

  try {
    const Event = createEventModel(userId); // Create the dynamic model

    const events = await Event.find();
    return res.status(200).json(events);
  } catch (error) {
    console.error('Error retrieving events:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  saveEvent,
  getEvents,
};
