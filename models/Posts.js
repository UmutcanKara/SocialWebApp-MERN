const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  location: {
    type: String,
  },
  toStream: [
    {
      type: Buffer,
      contentType: String,
      required: true,
    },
  ],
  desc: {
    type: String,
    required: true,
  },
  created: {
    type: Date,
    required: true,
  },
  likes: [
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
      },
    },
  ],
  comments: [
    {
      text: String,
      created: { type: Date },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    },
  ],
});

module.exports = Posts = mongoose.model("posts", PostSchema);
