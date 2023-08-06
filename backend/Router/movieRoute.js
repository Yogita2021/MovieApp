const express = require("express");

const movieRouter = express.Router();

require("dotenv").config();

// movie search by title

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
    // console.log(data);
    const searchResults =
      data.Search && Array.isArray(data.Search)
        ? data.Search.filter((movie) => {
            return movie.Title.toLowerCase().includes(query.toLowerCase());
          })
        : [];
    // console.log(searchResults);
    res.status(200).json({ data: searchResults });
  } catch (error) {
    res.json({ message: error.message });
  }
});

//  route for getting all the movies

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

// route for pagination
movieRouter.get("/movie", async (req, res) => {
  const page = req.query.page || 1;
  try {
    const { default: fetch } = await import("node-fetch");
    const response = await fetch(
      `http://www.omdbapi.com/?apikey=${process.env.Api_Key}&s=all&page=${page}`
    );
    const data = await response.json();
    // console.log(data);
    res.json(data.Search);
  } catch (error) {
    console.error("Error fetching data from OMDB API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//
movieRouter.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { default: fetch } = await import("node-fetch");
    const apidata = await fetch(
      `http://www.omdbapi.com/?s=${id}&apikey=${process.env.Api_Key}`
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
