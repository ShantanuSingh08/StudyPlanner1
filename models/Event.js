const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '#FF5733',
  },
  allDay: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Event', eventSchema);
