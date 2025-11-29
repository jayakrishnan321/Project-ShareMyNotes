const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');

const Note = require('../models/Note');
const User = require('../models/User');



// 📁 Multer setup to store files in "uploads/"
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) =>
    cb(null, `${Date.now()}-${file.originalname}`)
});

const upload = multer({ storage });
const BASE_URL = process.env.BASE_URL;

router.post('/upload', upload.single('file'), async (req, res) => {
  const { title, subject, uploadedBy } = req.body;

  // Use BASE_URL if present, else fallback to host from request
  const fileUrl = `/uploads/${req.file.filename}`;

  const note = new Note({
    title,
    subject,
    fileUrl,
    uploadedBy,
    status: 'approved'
  });

  await note.save();
  res.status(201).json({ message: 'Note uploaded successfully' });
});


// DELETE NOTE
router.delete('/:id', async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    if (!note) return res.status(404).json({ message: 'Note not found' });

    res.status(200).json({ message: 'Note deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
});


// USER UPLOAD
router.post('/upload-by-user', upload.single('file'), async (req, res) => {
  const { title, subject, uploadedBy } = req.body;

  if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

  const fileUrl = `/uploads/${req.file.filename}`;
  const note = new Note({
    title,
    subject,
    fileUrl,
    uploadedBy,
    status: 'pending'
  });

  await note.save();

  // Get all admin emails
  const admins = await User.find({ role: 'admin' });
  const adminEmails = admins.map(admin => admin.username);

  if (adminEmails.length === 0) {
    return res.status(200).json({ message: 'Note uploaded, but no admin emails found.' });
  }

  // SEND EMAIL TO ADMINS
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: adminEmails,
    subject: '📥 New Note Uploaded by Student',
    text: `Title: ${title}
Subject: ${subject}
Uploaded by: ${uploadedBy}

Login to admin panel to approve or reject.`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.error('Email Error:', err.message);
    else console.log('Email sent to admins:', info.response);
  });

  res.status(201).json({ message: 'Note uploaded and sent for approval' });
});


router.patch('/approve/:id', async (req, res) => {
  await Note.findByIdAndUpdate(req.params.id, { status: 'approved' });
  res.json({ message: 'Note approved' });
});


router.patch('/reject/:id', async (req, res) => {
  await Note.findByIdAndUpdate(req.params.id, { status: 'rejected' });
  res.json({ message: 'Note rejected' });
});


router.get('/', async (req, res) => {
  const notes = await Note.find().sort({ uploadedAt: -1 });
  res.json(notes);
});

router.get('/rejected',async(req,res)=>{
   const rejectedNotes = await Note.find({ status: 'rejected' }).sort({ uploadedAt: -1 });
  res.json(rejectedNotes)
})


router.get('/public', async (req, res) => {
  const approvedNotes = await Note.find({ status: 'approved' }).sort({ uploadedAt: -1 });
  res.json(approvedNotes);
});


router.get('/pending', async (req, res) => {
  const pendingNotes = await Note.find({ status: 'pending' });
  res.json(pendingNotes);
});




module.exports = router;
