const User = require("../models/userDB");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../middleware/authMiddleware");

//Add Users
exports.addUser = async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login function
exports.loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Check if password matches
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username },
      secretKey,
      { expiresIn: "1h" }
    );

    // Return the token
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
