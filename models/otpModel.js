const mongoose = require('mongoose');

// OTP schema definition
const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },  // Email to which OTP is sent
  otp: { type: Number, required: true },  // OTP number
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
});

// TTL index to automatically delete OTP after 5 minutes (300 seconds)
otpSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300 });

const Otp = mongoose.model('OtpRequest', otpSchema, 'otpRecords'); // Using otpRecords collection

module.exports = Otp;
