const jwt = require("jsonwebtoken");

require("dotenv").config();

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization || null;
    // console.log(token);
    if (!token) {
      return res.status(201).json({ isError: true, message: "Invalid user" });
    }

    const decode = jwt.decode(token, process.env.Secrete_key);

    const { userID } = decode;

    req.user = { userId: userID };

    next();
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { auth };
