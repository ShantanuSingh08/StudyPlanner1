// controllers/eventController.js

const mongoose = require('mongoose');

// Function to create or get an event model for a specific user
const getEventModel = (userId) => {
  const eventSchema = new mongoose.Schema({
    title: String,
    start: Date,
    end: Date,
    color: String,
    allDay: Boolean,
  });

  // Use the user's ID as part of the collection name
  return mongoose.model(`Event_${userId}`, eventSchema, `Event_${userId}`);
};

// Save event for a specific user
const saveEvent = async (req, res) => {
  const { userId, title, start, end, color, allDay } = req.body;

  try {
    const Event = getEventModel(userId);
    const newEvent = new Event({ title, start, end, color, allDay });
    await newEvent.save();
    res.status(201).json({ message: 'Event saved successfully', data: newEvent });
  } catch (error) {
    console.error('Error saving event:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// Get all events for a specific user
const getUserEvents = async (req, res) => {
  const { userId } = req.params;

  try {
    const Event = getEventModel(userId);
    const events = await Event.find();
    res.status(200).json(events);
  } catch (error) {
    console.error('Error retrieving events:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  saveEvent,
  getUserEvents,
};
