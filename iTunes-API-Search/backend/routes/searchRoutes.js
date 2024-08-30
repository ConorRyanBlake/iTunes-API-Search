const express = require("express");
const { searchContent } = require("../controller/searchController");
const { verifyJWT } = require("../middleware/authMiddleware");

const router = express.Router();

// Route to fetch searched item
router.get("/", verifyJWT, searchContent);

module.exports = router;
