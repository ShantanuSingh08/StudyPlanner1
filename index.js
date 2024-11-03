const express = require('express');
const cors = require('cors'); // Import the cors package
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes'); // Adjust path if necessary
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
app.use(cors()); // Enable CORS for all origins
app.use(express.json());

// Use user routes
app.use('/api', userRoutes); // This line connects your user routes to /api

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Ensure this is logged correctly
});
