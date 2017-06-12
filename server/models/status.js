const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const StatusSchema = new mongoose.Schema({
  text: String,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [Comment]
}, {
  timestamps: true
});

module.exports = mongoose.model('Status', StatusSchema);
