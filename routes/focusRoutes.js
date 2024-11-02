const express = require('express');
const { 
  updateDailyFocusTime, 
  updateWeeklyFocusTime, 
  updateMonthlyFocusTime 
} = require('../controllers/focusTimeController');
const router = express.Router();

// Route to update daily focus time for a user
router.post('/update-daily-focus', async (req, res) => {
  const { userId, date, timeSpent } = req.body;

  try {
    await updateDailyFocusTime(userId, { date, timeSpent });
    res.status(200).json({ message: 'Daily focus time updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating daily focus time', error: error.message });
  }
});

// Route to update weekly focus time for a user
router.post('/update-weekly-focus', async (req, res) => {
  const { userId, week, timeSpent } = req.body;

  try {
    await updateWeeklyFocusTime(userId, { week, timeSpent });
    res.status(200).json({ message: 'Weekly focus time updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating weekly focus time', error: error.message });
  }
});

// Route to update monthly focus time for a user
router.post('/update-monthly-focus', async (req, res) => {
  const { userId, month, timeSpent } = req.body;

  try {
    await updateMonthlyFocusTime(userId, { month, timeSpent });
    res.status(200).json({ message: 'Monthly focus time updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating monthly focus time', error: error.message });
  }
});

module.exports = router;
