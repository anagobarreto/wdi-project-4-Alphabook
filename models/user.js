const mongoose  = require('mongoose');
const bcrypt    = require('bcrypt');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  image: { type: String },
  location: { type: String, required: true },
  mobile: {type: Number },
  messages: [],
  passwordHash: { type: String, required: true }
});
