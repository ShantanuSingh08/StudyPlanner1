// controllers/.js
const Note = require('../models/Note');

// Get notes for a specific user
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.params.userId });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving notes' });
  }
};

// Create a new note
const createNote = async (req, res) => {
  const { userId, content } = req.body;

  try {
    const newNote = new Note({ userId, content });
    await newNote.save();
    res.status(201).json(newNote);
  } catch (error) {
    res.status(500).json({ message: 'Error saving note' });
  }
};

module.exports = { getNotes, createNote };
