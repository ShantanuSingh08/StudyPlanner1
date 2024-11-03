// models/eventModel.js
const mongoose = require('mongoose');

// Function to create a dynamic model for events based on user ID
const createEventModel = (userId) => {
  const eventSchema = new mongoose.Schema({
    title: String,
    start: String,
    end: String,
  });

  return mongoose.model(userId, eventSchema); // Use userId as the model name
};

module.exports = createEventModel;
