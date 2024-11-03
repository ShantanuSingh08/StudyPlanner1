// models/Event.js

const mongoose = require('mongoose');
const { eventConnection } = require('../app'); // Import the secondary connection

const eventSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  start: { type: Date, required: true },
  end: { type: Date, required: true },
  color: { type: String, default: '#FF5733' },
});

const Event = eventConnection.model('Event', eventSchema); // Use the event connection

module.exports = Event;
