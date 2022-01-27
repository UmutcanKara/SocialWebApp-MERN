const mongoose = require("mongoose");

const ProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  about: {
    type: String,
  },
  photo: {
    type: Buffer,
    contentType: String,
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
