const express = require("express");

const cors = require("cors");

const app = express();

require("dotenv").config();

const { connection } = require("./backend/config/db");

const { userRouter } = require("./backend/Router/userRoute");

const { playlistRouter } = require("./backend/Router/playListRoute");

const { movieRouter } = require("./backend/Router/movieRoute");

app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to MovieAPP Server!");
});

app.use("/user", userRouter);

app.use("/movies", movieRouter);

app.use("/playlist", playlistRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Connected to db at port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
