// routes/notes.js
const express = require('express');
const { getNotes, createNote } = require('../controllers/noteController');
const router = express.Router();

// GET notes for a specific user
router.get('/:userId', getNotes);

// POST a new note
router.post('/', createNote);

// DELETE a note by ID
router.delete('/:noteId', deleteNote);

module.exports = router;
