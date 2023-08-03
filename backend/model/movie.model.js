const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String },
  year: { type: String },
  rating: { type: Number },
  release: { type: Number },
  Director: { type: String },
  Genre: { type: String },
});
const Movie = mongoose.model("movie", movieSchema);
module.exports = { Movie };
