// controllers/focusTimeController.js

const FocusTime = require('../models/FocusTime');
const moment = require('moment'); // For date handling

// Function to add or update weekly focus time
const updateWeeklyFocusTime = async (userId, newFocusTime) => {
  try {
    // Get the start of the current week (Monday)
    const weekStart = moment().startOf('isoWeek').toDate(); // ISO week starts on Monday

    // Find the user's focus time record or create a new one if it doesn't exist
    let focusTimeRecord = await FocusTime.findOne({ userId });

    if (!focusTimeRecord) {
      focusTimeRecord = new FocusTime({ 
        userId, 
        dailyFocusTime: [], 
        weeklyFocusTime: [{ weekStart, timeSpent: newFocusTime }], 
        monthlyFocusTime: [] 
      });
    } else {
      // Check if there's an entry for the current week
      const existingWeekIndex = focusTimeRecord.weeklyFocusTime.findIndex((entry) =>
        moment(entry.weekStart).isSame(weekStart, 'week') // Check by week
      );

      if (existingWeekIndex >= 0) {
        // Update the focus time for the current week if it exists
        focusTimeRecord.weeklyFocusTime[existingWeekIndex].timeSpent += newFocusTime;
      } else {
        // Add a new entry for the current week
        focusTimeRecord.weeklyFocusTime.push({ weekStart, timeSpent: newFocusTime });
      }
    }

    // Ensure only the last 4 weeks are stored by trimming old entries
    if (focusTimeRecord.weeklyFocusTime.length > 4) {
      focusTimeRecord.weeklyFocusTime = focusTimeRecord.weeklyFocusTime.slice(-4);
    }

    // Save the updated record
    await focusTimeRecord.save();
    console.log('Weekly focus time updated successfully');
  } catch (error) {
    console.error('Error updating weekly focus time:', error);
  }
};

module.exports = { updateWeeklyFocusTime };
