const mongoose = require("mongoose");

const playlistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: { type: String, enum: ["public", "private"], required: true },
});
const Playlist = mongoose.model("playlist", playlistSchema);
module.exports = { Playlist };
