const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  easy: Number,
  medium: Number,
  hard: Number,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("User", userSchema);