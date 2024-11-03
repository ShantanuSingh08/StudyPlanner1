// controllers/focusTimeController.js

const FocusTime = require('../models/FocusTime');

// Create or update focus time for a user on a specific date
const saveFocusTime = async (req, res) => {
  const { userId, date, timeInSeconds } = req.body;

  try {
    const existingRecord = await FocusTime.findOne({ userId, date });
    
    if (existingRecord) {
      // Update existing record
      existingRecord.timeInSeconds += timeInSeconds;
      await existingRecord.save();
      return res.status(200).json({ message: 'Focus time updated successfully', data: existingRecord });
    } else {
      // Create a new record
      const newFocusTime = new FocusTime({ userId, date, timeInSeconds });
      await newFocusTime.save();
      return res.status(201).json({ message: 'Focus time saved successfully', data: newFocusTime });
    }
  } catch (error) {
    console.error('Error saving focus time:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Get focus time data for a specific user
const getFocusTimes = async (req, res) => {
  const { userId } = req.params;

  try {
    const focusTimes = await FocusTime.find({ userId });
    return res.status(200).json(focusTimes);
  } catch (error) {
    console.error('Error retrieving focus times:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  saveFocusTime,
  getFocusTimes,
};

