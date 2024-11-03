// models/Note.js
const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  userId: { type: String, required: true }, // Store the user ID
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;
