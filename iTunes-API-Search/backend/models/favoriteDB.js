const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  username: { type: String, required: true },
  albumId: { type: Number },
  trackName: { type: String },
  albumName: { type: String },
  artistName: { type: String },
  albumCover: { type: String },
  releaseDate: { type: String },
});

module.exports = mongoose.model("Favorite", favoriteSchema);
