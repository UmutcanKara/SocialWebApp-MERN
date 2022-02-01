const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  name: {
    type: String,
    required: true,
  },
  about: {
    type: String,
  },
  photo: {
    type: Buffer,
    contentType: String,
    default: " https://i.stack.imgur.com/34AD2.jpg",
  },
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  follower: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  created: {
    type: Date,
  },
  updated: {
    type: Date,
  },
  notifications: [
    {
      type: String,
    },
  ],
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
