const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  time: {
    type: Date,
  },
  isRead: {
    type: Boolean,
    default: false,
  },
});

module.exports = Chat = mongoose.model("chat", ChatSchema);
