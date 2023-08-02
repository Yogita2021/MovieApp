const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  title: { type: String, required: true },
  isPublic: { type: Boolean, default: false },
  movies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
  userID: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});
const Playlist = mongoose.model("playlist", playlistSchema);
module.exports = { Playlist };
