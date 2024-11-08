// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, editUser, deleteUser, getUserData, changePassword, sendOTP, verifyOTPAndChangeEmail  } = require('../controllers/userController');
const router = express.Router();

// Registration endpoint
router.post('/register', registerUser);

// Login endpoint
router.post('/login', loginUser);

// Edit user endpoint
router.put('/edit/:id', editUser); 

// Delete user endpoint
router.delete('/delete/:id', deleteUser);

// Get user data endpoint
router.get('/user/:id', getUserData); 

// Change password endpoint
router.post('/change-password', changePassword);

// Send OTP endpoint
router.post('/send-otp', authenticateToken, sendOTP);

// Verify OTP & Change email endpoint
router.post('/verify-otp', authenticateToken, verifyOTPAndChangeEmail);

module.exports = router;
