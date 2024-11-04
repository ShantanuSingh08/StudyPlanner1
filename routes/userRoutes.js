// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, editUser } = require('../controllers/userController');
const router = express.Router();

// Registration endpoint
router.post('/register', registerUser);

// Login endpoint
router.post('/login', loginUser);

// Edit user endpoint
router.put('/edit/:id', editUser); 

module.exports = router;
