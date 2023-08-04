const express = require("express");
const movieRouter = express.Router();
const { Movie } = require("../model/movie.model");
// const fetch = require("node-fetch");
require("dotenv").config();

movieRouter.post("/search", async (req, res) => {
  const { query } = req.body;
  try {
    const { default: fetch } = await import("node-fetch");
    const apidata = await fetch(
      `https://www.omdbapi.com/?s=${query}&apikey=${process.env.Api_Key}`
    );

    if (!apidata.ok) {
      throw new Error("Failed to fetch data from the OMDB API.");
    }
    const data = await apidata.json();
    const searchResults =
      data.Search && Array.isArray(data.Search)
        ? data.Search.filter((movie) => {
            return movie.Title.toLowerCase().includes(query.toLowerCase());
          })
        : [];

    res.status(200).json({ data: searchResults });
  } catch (error) {
    res.json({ message: error.message });
  }
});

movieRouter.get("/", async (req, res) => {
  try {
    const { default: fetch } = await import("node-fetch");
    const apidata = await fetch(
      `http://www.omdbapi.com/?s=all&apikey=${process.env.Api_Key}`
    );

    const data = await apidata.json();
    // console.log(data);

    res.status(200).json({ data: data.Search });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

module.exports = { movieRouter };
