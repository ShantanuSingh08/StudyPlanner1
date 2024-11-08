//otpRoutes.js
const express = require('express');
const { requestOtp, verifyOtp } = require('../controllers/otpController');
const router = express.Router();

// Route to request OTP for email change
router.post('/request-otp', requestOtp);

// Route to verify OTP and update email
router.post('/verify-otp', verifyOtp);

module.exports = router;
