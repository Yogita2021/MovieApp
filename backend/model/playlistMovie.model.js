const mongoose = require("mongoose");

const playlistMoviesSchema = new mongoose.Schema({
  Poster: { type: String },
  Title: { type: String, required: true },
  Year: { type: String, required: true },
  playlistID: { type: String, required: true },
});

const PlaylistMovieModel = mongoose.model(
  "PlaylistMovie",
  playlistMoviesSchema
);

module.exports = { PlaylistMovieModel };
