const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Create a new user
router.post("/register", async (req, res) => {
  const user = new User({
    // fill in fields from req.body
  });
  
  try {
    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    res.json({ message: err });
  }
});

// Add more routes as needed

module.exports = router;
