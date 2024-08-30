const jwt = require("jsonwebtoken");
const secretKey = "HyperionDev";

const verifyJWT = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }

  try {
    const decoded = jwt.verify(token.split(" ")[1], secretKey);
    req.user = decoded; 
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = { verifyJWT, secretKey };
