const Favorite = require("../models/favoriteDB");

exports.addFavorite = async (req, res) => {
  const { albumId, albumName, artistName, albumCover, releaseDate, trackName } =
    req.body;

  // Log req.user to ensure it is set
  console.log("Request User:", req.user);

  try {
    // Create new Favorite
    const newFavorite = new Favorite({
      userId: req.user.id, // Ensure this matches the token payload
      username: req.user.username,
      albumId,
      trackName,
      albumName,
      artistName,
      albumCover,
      releaseDate,
    });

    // Save to the database
    await newFavorite.save();
    res.status(201).json({ message: "Album added to favorites" });
  } catch (error) {
    console.error("Error adding album to favorites:", error); // Log detailed error
    res.status(500).json({ message: "Failed to add album to favorites" });
  }
};

exports.getFavorites = async (req, res) => {
  try {
    const userId = req.user.id; // Access user ID from the JWT
    const favorites = await Favorite.find({ userId });

    if (favorites.length === 0) {
      return res
        .status(404)
        .json({ message: "No favorites found for this user" });
    }

    res.status(200).json(favorites);
  } catch (err) {
    console.error("Error fetching favorites:", err);
    res
      .status(500)
      .json({ message: "Failed to retrieve favorites", error: err.message });
  }
};

exports.removeFavorite = async (req, res) => {
  try {
    const userId = req.user.id; // Get user ID from the JWT
    const { favoriteId } = req.params; // Get favoriteId from the request parameters

    // Find and delete the favorite by its Object ID
    const result = await Favorite.findOneAndDelete({ _id: favoriteId, userId });

    if (!result) {
      return res
        .status(404)
        .json({ message: "Favorite not found or not owned by this user" });
    }

    res.status(200).json({ message: "Favorite deleted successfully" });
  } catch (err) {
    console.error("Error deleting favorite:", err);
    res
      .status(500)
      .json({ message: "Failed to delete favorite", error: err.message });
  }
};
