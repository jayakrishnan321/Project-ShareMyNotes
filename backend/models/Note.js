const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
  title: String,
  subject: String,
  fileUrl: String,
  uploadedBy: String, // email or 'admin'
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Note', noteSchema);
