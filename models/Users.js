// models/Users.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  class: { type: String },
  school: { type: String },
  dob: { type: Date },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  ip: { type: String },
});

module.exports = mongoose.model('users', userSchema);
