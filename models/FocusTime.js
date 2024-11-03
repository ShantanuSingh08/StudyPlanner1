//models/FocusTime.js

const mongoose = require('mongoose');

const FocusTimeSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  timeInSeconds: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

const FocusTime = mongoose.model('FocusTime', FocusTimeSchema);

module.exports = FocusTime;
