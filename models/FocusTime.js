// models/FocusTime.js
const mongoose = require('mongoose');

const focusTimeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: String,
    required: true
  },
  timeInSeconds: {
    type: Number,
    default: 0
  }
});

module.exports = mongoose.model('FocusTime', focusTimeSchema);
