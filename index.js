const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const focusTimeRoutes = require('./routes/focusTimeRoutes');
const eventRoutes = require('./routes/eventRoutes'); // Import event routes
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.use('/api', userRoutes);
app.use('/api/focus-time', focusTimeRoutes);
app.use('/api/events', eventRoutes); // Use event routes

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
