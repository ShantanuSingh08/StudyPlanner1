// routes/userRoutes.js
const express = require('express');
const { registerUser, loginUser, editUser, deleteUser  } = require('../controllers/userController');
const router = express.Router();

// Registration endpoint
router.post('/register', registerUser);

// Login endpoint
router.post('/login', loginUser);

// Edit user endpoint
router.put('/edit/:id', editUser); 

// Delete user endpoint
router.delete('/delete/:id', deleteUser);

module.exports = router;
