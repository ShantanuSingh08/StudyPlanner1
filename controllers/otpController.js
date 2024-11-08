const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

// Function to generate OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
}

// Send OTP to the provided email
async function sendOtpEmail(email, otp) {
  const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
      user: 'shantanux001@gmail.com',
      pass: 'Singh@123', // Use app password if 2FA enabled
    },
  });

  const mailOptions = {
    from: 'shantanux001@gmail.com',
    to: email,
    subject: 'Your OTP for Email Change',
    text: `Your OTP for changing email is: ${otp}`,
  };

  await transporter.sendMail(mailOptions);
}

// API endpoint to request OTP for email change
async function requestOtp(req, res) {
  const { newEmail } = req.body; 

  // Check if email already exists in the database
  const existingUser = await User.findOne({ email: newEmail });
  if (existingUser) {
    return res.status(400).json({ message: 'Email is already in use' });
  }

  // Generate OTP
  const otp = generateOtp();
  
  // Save OTP in a temporary database or session
  const otpRecord = new Otp({
    email: newEmail,
    otp: otp,
    createdAt: new Date(),
  });
  await otpRecord.save();

  // Send OTP via email
  await sendOtpEmail(newEmail, otp);

  return res.status(200).json({ message: 'OTP sent to the new email address' });
}

// Verify OTP and change email
async function verifyOtp(req, res) {
  const { userId, otp, newEmail } = req.body;

  // Find OTP record
  const otpRecord = await Otp.findOne({ email: newEmail, otp });

  // If OTP doesn't exist or expired
  if (!otpRecord || new Date() - otpRecord.createdAt > 300000) {  // 5 minutes expiration
    return res.status(400).json({ message: 'Invalid or expired OTP' });
  }

  // Find user and update email
  const user = await User.findById(userId);
  user.email = newEmail;
  await user.save();

  // Remove OTP record from the database
  await Otp.deleteOne({ _id: otpRecord._id });

  return res.status(200).json({ message: 'Email updated successfully' });
}

module.exports = { requestOtp, verifyOtp };
