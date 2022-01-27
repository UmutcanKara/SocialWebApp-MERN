const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Models
const Profile = require("../../models/Profile");
const User = require("../../models/User");
const Posts = require("../../models/Posts");

// @route     POST api/profile/me
// @desc      Create/update profile
// @access    Private (auth)

router.post("/", auth, async (req, res) => {
  const { about, photo, following, follower, created, notification } = req.body;
  const newProfile = {};
  newProfile.user = req.user.id;
  if (about) newProfile.about = about;
  if (photo) newProfile.photo = photo;
  if (following) newProfile.following = following;
  if (follower) newProfile.follower = follower;
  if (notification) newProfile.notification = notification;
  created ? (newProfile.created = created) : Date.now();
  newProfile.updated = Date.now();

  try {
    let profile = await Profile.findOne({ user: req.user.id });
    // See if the profile exists

    if (profile) {
      // Update
      profile = await Profile.findOneAndUpdate(
        { user: req.user.id },
        { $set: newProfile },
        { new: true }
      );
      return res.json(profile);
    }

    // Create
    profile = new Profile(newProfile);
    await profile.save();
    return res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/profile/me
// @desc      Get my profile
// @access    Private (auth)

router.get("/me", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      ["name"]
    );
    if (!profile) {
      return res.status(400).send("There is no profile for this user");
    }

    return res.json(profile);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// @route     GET api/profile/:id
// @desc      Get profile by id
// @access    Private (auth)

router.get("/:user_id", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate("user", ["name"]);

    if (!profile)
      return res.status(400).json({ msg: "There is no profile for this user" });

    res.json(profile);
  } catch (err) {
    console.error(err);
    if (err.kind === "ObjectId")
      return res.status(400).json({ msg: "Profile Not Found" });
    res.status(500).send("Server Error");
  }
});

// @route     DELETE api/profile/
// @desc      Delete current users profile
// @access    Private (auth)
router.delete("/", auth, async (req, res) => {
  try {
    // Remove Posts
    await Posts.findOneAndDelete({ user: req.user.id });

    // Remove Profile
    await Profile.findOneAndDelete({ user: req.user.id });

    // Remove User
    await User.findOneAndDelete({ _id: req.user.id });

    res.json({ msg: "User Deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
