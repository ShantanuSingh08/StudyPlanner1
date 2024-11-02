// models/FocusTime.js
const mongoose = require('mongoose');

const focusTimeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  dailyFocusTime: [{ date: Date, timeSpent: Number }], // Array to track last 7 days' focus time
  weeklyFocusTime: [{ weekStart: Date, timeSpent: Number }], // Array for weekly focus time, capped at 4 entries
  monthlyFocusTime: [{ month: String, timeSpent: Number }] // Array to track monthly focus time
});

const FocusTime = mongoose.model('FocusTime', focusTimeSchema);
module.exports = FocusTime;
