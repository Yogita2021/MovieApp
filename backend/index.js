const express = require("express");

const cors = require("cors");

const app = express();
require("dotenv").config();
const { connection } = require("./config/db");
const { userRouter } = require("./Router/userRoute");
const { playlistRouter } = require("./Router/playListRoute");
const { movieRouter } = require("./Router/movieRoute");
const { auth } = require("./middleware/auth");
app.use(cors());
app.use(express.json());

app.use("/user", userRouter);
app.use("/movies", movieRouter);
app.use(auth);

app.use("/playlist", playlistRouter);

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Connected to db at port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
