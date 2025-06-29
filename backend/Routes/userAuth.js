const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User');

// Register
router.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const exist = await User.findOne({ username: email });
  if (exist) return res.status(400).json({ message: 'User already exists' });

  const hash = await bcrypt.hash(password, 10);
  const user = new User({ username: email, password: hash, role: 'user' });
  await user.save();
  res.status(201).json({ message: 'User registered' });
});

// Login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ username: email, role: 'user' });
  if (!user) return res.status(400).json({ message: 'Invalid credentials' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: 'Invalid credentials' });

  const token = jwt.sign({ id: user._id, role: user.role, email }, process.env.JWT_SECRET);
  res.json({ token ,email:user.username,role:user.role});
});

module.exports = router;
