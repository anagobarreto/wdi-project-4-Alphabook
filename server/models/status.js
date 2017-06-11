const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  text: String,
  userId: mongoose.Schema.Types.ObjectId,
  likes: [mongoose.Schema.Types.ObjectId],
  comments: [{
    text: String,
    userId: mongoose.Schema.Types.ObjectId
  }]
});

module.exports = mongoose.model('Status', StatusSchema);
