// routes/focusRoutes.js
const express = require('express');
const { updateWeeklyFocusTime } = require('../controllers/focusTimeController');
const router = express.Router();

router.post('/update-weekly-focus', async (req, res) => {
  const { userId, focusTime } = req.body;

  try {
    await updateWeeklyFocusTime(userId, focusTime);
    res.status(200).json({ message: 'Weekly focus time updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error updating weekly focus time', error });
  }
});

module.exports = router;
