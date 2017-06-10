const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  name: String,
  profilePic: String,
  text: String,
  likeCount: Number,
  liked: Boolean
});

module.exports = mongoose.model('Status', StatusSchema);
