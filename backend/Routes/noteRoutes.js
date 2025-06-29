const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Note = require('../models/Note');

// 📁 Multer setup to store files in "uploads/"
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });

// ✅ Upload Route
router.post('/upload', upload.single('file'), async (req, res) => {
  const { title, subject } = req.body;
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

  const note = new Note({ title, subject, fileUrl });
  await note.save();

  res.status(201).json({ message: 'Note uploaded successfully' });
});

// ✅ View Notes Route
router.get('/', async (req, res) => {
  const notes = await Note.find().sort({ uploadedAt: -1 });
  res.json(notes);
});

module.exports = router;
