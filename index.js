// server.js
npm install moment

const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const focusRoutes = require('./routes/focusRoutes'); // Import focus time routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/focus', focusRoutes); // Add route for focus time

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
