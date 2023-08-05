const express = require("express");
const playlistRouter = express.Router();
const { Playlist } = require("../model/playlist.model");
const { PlaylistMovieModel } = require("../model/playlistMovie.model");
const { auth } = require("../middleware/auth");

// route for creating playlist

playlistRouter.post("/create", auth, async (req, res) => {
  try {
    const { name, type } = req.body;
    const playlist = new Playlist({
      name,
      type,
    });
    await playlist.save();
    res.status(200).json({
      isError: false,
      msg: "Playlist created !",
      playlist: playlist,
    });
  } catch (error) {
    res.status(400).json({
      isError: true,
      message: error.message,
    });
  }
});

// for adding movie to the playlist

playlistRouter.post("/addMovie/:playlistID", async (req, res) => {
  try {
    const { playlistID } = req.params;
    // console.log(req.body);
    const data = new PlaylistMovieModel({ ...req.body, playlistID });
    await data.save();
    res.status(200).json({ msg: "Added to the playlist", data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

playlistRouter.get("/getMovie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = await PlaylistMovieModel.find({ playlistID: id });
    res.status(200).send({ data });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// route for Getting all the  private playlists

playlistRouter.get("/privatePlaylist", auth, async (req, res) => {
  try {
    const PrivatePlaylist = await Playlist.find({
      userId: req.userId,
      type: "private",
    });

    res.status(200).json({ isError: false, PrivatePlaylist });
  } catch (error) {
    res.status(500).json({
      isError: true,
      message: "An error occurred while fetching playlists",
    });
  }
});

// route for Getting all the  public  playlists

playlistRouter.get("/PublicPlaylist", async (req, res) => {
  try {
    const PublicPlaylist = await Playlist.find({
      type: "public",
    });

    res.status(200).json({ isError: false, PublicPlaylist });
  } catch (error) {
    res.status(500).json({
      isError: true,
      message: "An error occurred while fetching playlists",
    });
  }
});

module.exports = { playlistRouter };
