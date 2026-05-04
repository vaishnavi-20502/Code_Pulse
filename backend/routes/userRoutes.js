const express = require("express");
const router = express.Router();

const getLeetCodeData = require("../services/leetcodeService");
const User = require("../models/User");

// POST: Fetch and store user data
router.post("/fetch", async (req, res) => {
  try {
    const { username } = req.body;

    if (!username) {
      return res.status(400).json({ error: "Username is required" });
    }

    const data = await getLeetCodeData(username);

    if (!data.matchedUser) {
      return res.status(404).json({ error: "User not found on LeetCode" });
    }

    const stats = data.matchedUser.submitStats.acSubmissionNum;

    let easy = 0, medium = 0, hard = 0;

    stats.forEach(item => {
      if (item.difficulty === "Easy") easy = item.count;
      if (item.difficulty === "Medium") medium = item.count;
      if (item.difficulty === "Hard") hard = item.count;
    });

    const user = new User({
      username,
      easy,
      medium,
      hard
    });

    await user.save();

    res.json(user);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;