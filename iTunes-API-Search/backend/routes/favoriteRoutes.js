const express = require("express");
const { verifyJWT } = require("../middleware/authMiddleware");
const {
  addFavorite,
  getFavorites,
  removeFavorite,
} = require("../controller/favoriteController");

const router = express.Router();

// Route to add a favorite
router.post("/add", verifyJWT, addFavorite);

// Route to get favorites
router.get("/", verifyJWT, getFavorites);

//Route to remove favorite
router.delete("/remove/:favoriteId", verifyJWT, removeFavorite);

module.exports = router;
