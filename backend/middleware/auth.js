const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorisation.split(" ");
    if (!token) {
      res.status(201).json({ message: "Invalid user" });
    } else {
      const decode = jwt.decode(token, process.env.Secrete_key);
      if (!decode) {
        res.status(201).json({ message: "Loginn first !" });
      } else {
        const { email, userID } = decode;
        req.user = { email, userID };
        next();
      }
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
module.exports = { auth };
