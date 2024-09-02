const jwt = require('jsonwebtoken');
const env = require("dotenv");
const Auth = require("../models/authModel");
env.config();

 const authVerify = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(403).json({ message: "Token not found!" });
    }

    const isTokenVerified = jwt.verify(token, process.env.SECRET_KEY);

    const auth = await Auth.findById(isTokenVerified.id).select("-password");

    if (!auth) {
      return res.status(404).json({ message: "Auth not found!" });
    } else {
      req.auth = auth;
      next();
    }
  } catch (error) {
    res.status(403).json({ message: "Not authenticated!" });
  }
};

module.exports = {authVerify};

