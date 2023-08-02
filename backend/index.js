const express = require("express");

const cors = require("cors");

const app = express();
require("dotenv").config();
const { connection } = require("./config/db");
const { userRouter } = require("./Router/userRoute");
const { auth } = require("./middleware/auth");
app.use(express.json());
app.use(cors());
app.use("/user", userRouter);
app.get("/", (req, res) => {
  res.send("hi");
});

app.listen(process.env.PORT, async () => {
  try {
    await connection;
    console.log(`Connected to db at port ${process.env.PORT}`);
  } catch (error) {
    console.log(error);
  }
});
