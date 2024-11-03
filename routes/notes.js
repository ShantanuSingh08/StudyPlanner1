// routes/notes.js
const express = require('express');
const router = express.Router();
const Note = require('../models/Note');

// GET notes for a specific user
router.get('/:userId', async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.params.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving notes' });
  }
});

// POST a new note
router.post('/', async (req, res) => {
  const { userId, content } = req.body;

  try {
    const newNote = new Note({ userId, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Error saving note' });
  }
});

module.exports = router;
