const express = require("express");
const playlistRouter = express.Router();
const { Playlist } = require("../model/playlist.model");
playlistRouter.post("/create", async (req, res) => {
  try {
    const { title, isPublic, movies } = req.body;
    const playlist = new Playlist({
      title,
      isPublic,
      movies,
    });
    await playlist.save();
    res.status(200).json({ msg: "Playlist created !", playlist: playlist });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
playlistRouter.get("/:userID", async (req, res) => {
  try {
    const { userID } = req.params;
    const playlist = await Playlist.findBy({ userID: userID }).populate(
      "movies"
    );
    if (!playlist) {
      res.status(201).json({ msg: "playlist not found" });
    } else {
      res.status(200).json({ msg: "playlist is available", playlist });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
module.exports = { playlistRouter };
