const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

const User = require('../models/User');


const otpStore = {}; // 


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

  const token = jwt.sign({ id: user._id, email:user.username, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
  res.status(200).json({
    message: 'Login successful',
    token,
    email: user.username,
    role: user.role
  });
});
router.put('/change-password/:id',async (req,res)=>{
  try {  const id=req.params.id
        const user = await User.findById(id);
        const { oldPassword, newPassword } = req.body;

        const isMatch = await bcrypt.compare(oldPassword, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Old password is incorrect" });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        await user.save();

      res.json({ msg: "Password updated successfully" });
    } catch (err) {
        res.status(500).json({ msg: "Error updating password" });
    }
})


module.exports = router;
