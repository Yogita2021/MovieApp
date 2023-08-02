const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isPublic: { type: Boolean, default: false },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "movie" }],
  userID: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});
const Playlist = mongoose.model("Playlist", playlistSchema);
module.exports = { Playlist };
