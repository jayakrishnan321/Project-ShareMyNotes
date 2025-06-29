require('dotenv').config(); // ✅ Load .env variables at the top

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const otpStore = {}; // Temporary in-memory OTP store


// ✅ Setup mail transporter ONCE
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

// ✅ Route: Send OTP
router.post('/send-otp', async (req, res) => {
  const { email, password, secretKey } = req.body;

  console.log('📤 Attempting to send email to:', email);
  console.log('📨 Using MAIL_USER:', process.env.MAIL_USER);

  if (secretKey !== process.env.ADMIN_SECRET) {
    return res.status(403).json({ message: 'Invalid Admin Secret' });
  }

  const existingUser = await User.findOne({ username: email });
  if (existingUser) {
    return res.status(400).json({ message: 'Admin already exists' });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  otpStore[email] = {
    otp,
    password,
    createdAt: Date.now()
  };

  const mailOptions = {
    from: process.env.MAIL_USER,
    to: email,
    subject: 'Admin OTP Verification',
    text: `Your OTP is ${otp}. It will expire in 5 minutes.`
  };

  transporter.sendMail(mailOptions, (err, info) => {
    console.log("✅ MAIL_USER:", process.env.MAIL_USER);
console.log("✅ MAIL_PASS:", process.env.MAIL_PASS);

    if (err) {
      console.error('❌ Email sending error:', err);
      return res.status(500).json({ message: 'Failed to send email', error: err.message });
    }
    console.log('✅ OTP email sent:', info.response);
    res.status(200).json({ message: 'OTP sent to email' });
  });
});

// ✅ Route: Verify OTP and Register Admin
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  const record = otpStore[email];

  if (!record) return res.status(400).json({ message: 'OTP not found or expired' });
  if (record.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

  const hashedPassword = await bcrypt.hash(record.password, 10);
  const newAdmin = new User({
    username: email,
    password: hashedPassword,
    role: 'admin'
  });

  await newAdmin.save();
  delete otpStore[email];

  res.status(201).json({ message: 'Admin registered successfully' });
});

// ✅ Route: Admin Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ username: email, role: 'admin' });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });

  res.status(200).json({ message: 'Login successful', token, role: user.role });
});

module.exports = router;
