// controllers/userController.js
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');

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

module.exports = { registerUser, loginUser, editUser, deleteUser, getUserData };
