// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models/Users');
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('../middleware/authMiddleware');

// Registration logic
const registerUser = async (req, res) => {
  const { email, password, name, dob, classOrCourse, school } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name, dob, classOrCourse, school });
    await user.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (error) {
    res.status(400).json({ message: 'Email Already Exists' });
  }
};

// Login logic
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '720h' });
     res.json({
      message: 'Login successful',
      token,
      email: user.email,
      userId: user._id,
      name: user.name,
      dob: user.dob,
      classOrCourse: user.classOrCourse,
      school: user.school
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};


// Edit user data
const editUser = async (req, res) => {
  const userId = req.params.id;
  const { email, name, dob, classOrCourse, school } = req.body;
  try {
    // Find the user by ID and update with new data
    console.log('Received data:', req.body); 
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { email, name, dob, classOrCourse, school },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully', user: updatedUser });
  } catch (error) {
    res.status(500).json({ message: 'Server error during update' });
  }
};


// Get user data logic
const getUserData = async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findById(userId).select('-password'); // Exclude the password field
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete user logic
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during deletion' });
  }
};

// Change password
const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  const token = req.headers.authorization.split(' ')[1];
  
  try {
    // Verify token and retrieve user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Check if current password matches
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect current password' });
    }

    // Hash the new password and update
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating password' });
  }
};

// Send OTP endpoint
// Setup email transporter
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,  // Use environment variables for security
    pass: process.env.EMAIL_PASS,  // Use app password if 2FA is enabled
  },
});

// Generate OTP with added security (hex string for randomness)
const generateOTP = () => crypto.randomInt(100000, 999999).toString();

// Send OTP endpoint
 const sendOTP = async (req, res) => {
  try {
    const { newEmail } = req.body;
    const otp = generateOTP();
    const otpExpiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes expiration

    // Save OTP and new email temporarily to user document
    const user = await User.findById(req.user.id);
    user.tempOtp = otp;
    user.tempOtpExpiresAt = otpExpiresAt; // Store expiration time
    user.tempEmail = newEmail;
    await user.save();

    // Send OTP to new email
    await transporter.sendMail({
      to: newEmail,
      subject: 'Your OTP Code',
      text: `Your OTP code is ${otp}. This code will expire in 10 minutes.`,
    });

    res.status(200).json({ message: 'OTP sent to new email address' });
  } catch (error) {
    console.error("Error sending OTP:", error);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Verify OTP and Update Email endpoint
const verifyOTPAndChangeEmail = async (req, res) => {
  try {
    const { otp } = req.body;
    const user = await User.findById(req.user.id);

    // Validate OTP and expiration
    if (!user.tempOtp || !user.tempOtpExpiresAt || Date.now() > user.tempOtpExpiresAt) {
      return res.status(400).json({ error: 'OTP has expired or is invalid' });
    }

    if (user.tempOtp === otp) {
      // Update the email and clear temp fields
      user.email = user.tempEmail;
      user.tempOtp = null;
      user.tempOtpExpiresAt = null;
      user.tempEmail = null;
      await user.save();

      res.status(200).json({ message: 'Email updated successfully' });
    } else {
      res.status(400).json({ error: 'Invalid OTP' });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};

module.exports = { registerUser, loginUser, editUser, deleteUser, getUserData, changePassword, sendOTP, verifyOTPAndChangeEmail };
