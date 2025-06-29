const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

const noteRoutes = require('./Routes/noteRoutes');
const path = require('path');
// Middleware
app.use(cors());
app.use(express.json());
// Middleware
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/notes', noteRoutes);
// Connect MongoDB
const userAuth = require('./Routes/userAuth');


app.use('/api/user', userAuth);
app.use('/api/notes', noteRoutes);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
const adminAuthRoutes = require('./routes/adminAuth');
app.use('/api/admin', adminAuthRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
