const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); // Import user routes
const focusTimeRoutes = require('./routes/focusTimeRoutes'); // Import focus time routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Database connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(cors());
app.use(express.json());

// Use user routes
app.use('/api', userRoutes); // All user routes will be prefixed with /api

// Use focus time routes
app.use('/api', focusTimeRoutes); // All focus time routes will be prefixed with /api

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
