const nodemailer = require('nodemailer');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/Users'); // User model to find user and update email
const Otp = require('../models/otpModel'); // OTP model to store OTP requests
require('dotenv').config();

// Function to generate OTP
function generateOtp() {
  return Math.floor(100000 + Math.random() * 900000); // 6-digit OTP
}

// Send OTP to the provided email
async function sendOtpEmail(email, otp) {
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS,
  },
  });


  const mailOptions = {
    from: 'shantanux001@outlook.com',
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
  const { otp, newEmail, userId } = req.body;

  try {
    // Find OTP record based on the provided email and OTP
    const otpRecord = await Otp.findOne({ email: newEmail, otp });

    // Check if OTP exists and is not expired (5-minute expiration)
    if (!otpRecord || new Date() - otpRecord.createdAt > 300000) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Find user by the original email associated with the OTP
    const user = await User.findOne({ userId: user.userId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's email to the new email
    user.email = newEmail;
    await user.save();

    // Remove OTP record from the database after successful verification
    await Otp.deleteOne({ _id: otpRecord._id });

    // Return a success message
    return res.status(200).json({ message: 'Email updated successfully' });
  } catch (error) {
    console.error('Error in verifyOtp:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}


module.exports = { requestOtp, verifyOtp };
