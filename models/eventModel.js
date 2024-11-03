// models/eventModel.js
const mongoose = require('mongoose');

// Function to create a dynamic model for events based on user ID
const createEventModel = (userId) => {
  if (typeof userId !== 'string') {
    throw new Error('userId must be a string');
  }

  // Sanitize userId to create a valid collection name (e.g., remove special characters)
  const sanitizedUserId = userId.replace(/[^a-zA-Z0-9]/g, '_'); // Replace invalid characters

  const eventSchema = new mongoose.Schema({
    title: String,
    start: String,
    end: String,
  });

  return mongoose.model(sanitizedUserId, eventSchema); // Use sanitized userId as the model name
};

module.exports = createEventModel;
