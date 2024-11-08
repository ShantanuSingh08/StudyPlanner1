// models/Users.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  classOrCourse: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  tempEmail: { 
    type: String
 },
  tempOtp: {
   type: String 
  }
});

module.exports = mongoose.model('User', userSchema);
