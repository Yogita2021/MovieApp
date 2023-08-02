const express = require("express");
const movieRouter = express.Router();
const { Movie } = require("../model/movie.model");
require("dotenv").config();
movieRouter.get("/search", async (req, res) => {
  try {
    const { query } = req.body;
    const res = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=process.env.Api_Key`
    );

    const data = await res.json();
    res.json(data.search);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = { movieRouter };
