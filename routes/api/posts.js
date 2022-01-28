const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const { check, validationResult } = require("express-validator");

//Models
// const User = require("../../models/User");
const Posts = require("../../models/Posts");
// const Profile = require("../../models/Profile");

// @route     POST api/posts/
// @desc      Add a Post
// @access    Private (auth)
router.post(
  "/",
  [
    auth,
    [
      check("toStream", "You need to post something").notEmpty(),
      check("desc", "You need a description").notEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { location, toStream, desc } = req.body;
    const newPost = {};
    newPost.user = req.user.id;
    if (location) newPost.location = location;
    newPost.toStream = toStream;
    newPost.desc = desc;
    newPost.created = Date.now();

    try {
      const post = new Posts(newPost);
      await post.save();
      return res.json(post);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);

// @route     GET api/posts/following
// @desc      Get following users posts
// @access    Private (auth)

// router.get("/following",auth,async(req,res)=>{
//     try {
//       const currentProfile = await Profile.findOne({user: req.user.id})
//       const followerArr  = currentProfile.following
//       const followerPostArr = followerArr
//     } catch (err) {
//       console.error(err)
//       res.status(500).send('Server Error')
//     }
// });

// @route     GET api/posts/all
// @desc      Get all posts
// @access    Private (auth)

router.get("/all", auth, async (req, res) => {
  try {
    const allPosts = await Posts.find().sort({ created: -1 });
    res.json(allPosts);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/posts/:id
// @desc      Get post by id
// @access    Private (auth)

router.get("/:id", auth, async (req, res) => {
  try {
    const singlePost = await Posts.findById(req.params.id);
    if (!singlePost) {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    res.json(singlePost);
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      res.status(404).json({ msg: "Post Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/posts/:id
// @desc      Delete post by id
// @access    Private (auth)

router.delete("/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findOne(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post Not Found" });
    }

    // Check if the current user is posts creator
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: "User Not Authorized" });
    }

    await post.remove();

    res.json({ msg: "Post Removed" });
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/posts/like/:id
// @desc      Like a post
// @access    Private (auth)

router.put("/like/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    // See if the user has Already Liked the post
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: "Post Already Liked" });
    }

    post.likes.unshitf({ user: req.user.id });
    await post.save();
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

// @route     PUT api/posts/unlike/:id
// @desc      Unlike a post
// @access    Private (auth)

router.put("/unlike/:id", auth, async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    // See if its Liked or not
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: "Post Has Not Been Liked Yet" });
    }
    // Get Remove Index
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    post.likes.splice(removeIndex, 1);

    await post.save();
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "Post Not Found" });
    }
    res.status(500).send("Server Error");
  }
});

module.exports = router;
