// controllers/eventController.js
const createEventModel = require('../models/eventModel');

// Save an event for a specific user
const saveEvent = async (req, res) => {
  const { userId, title, start, end } = req.body;

  if (!userId || !title || !start || !end) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  // Ensure userId is a string and not empty
  if (typeof userId !== 'string' || userId.trim() === '') {
    return res.status(400).json({ message: 'Invalid userId' });
  }

  try {
    const Event = createEventModel(userId); // Create the dynamic model

    const newEvent = new Event({ title, start, end });
    await newEvent.save();

    return res.status(201).json({ message: 'Event saved successfully', data: newEvent });
  } catch (error) {
    console.error('Error saving event:', error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};
