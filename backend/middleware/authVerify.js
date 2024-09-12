const jwt = require('jsonwebtoken');
const env = require("dotenv");
const User = require("../models/authModel");
env.config();

const authVerify = async (req, res, next) => {
  try {
    // Get the token from the request body
  // const  token  = req.headers.authorization;
 

  // Get the token from the Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.startsWith('Bearer ') ? authHeader.substring(7) : null;


    if (!token) {
      return res.status(403).json({ message: "Token not found in request body!" });
    }

    // Verify the token
    const isTokenVerified = jwt.verify(token, process.env.SECRET_KEY);

    // Find the user based on the decoded token
    const user = await User.findById(isTokenVerified.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // Attach user to the request object for access in subsequent middleware/routes
    req.user = user;
    next(); // Proceed to the next middleware/route
  } catch (error) {
    return res.status(403).json({ message: "Not authenticated!", error: error.message });
  }
};


module.exports = {authVerify};

