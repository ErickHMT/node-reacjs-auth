const jwt = require("jsonwebtoken");
const config = require("../../config");

const getTokenFromHeader = req => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "Bearer"
  ) {
    return req.headers.authorization.split(" ")[1];
  }
};

const checkToken = (req, res, next) => {
  let token = getTokenFromHeader;

  if (token) {
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "Token is not valid" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.status(401).json({ message: "Auth token is not supplied" });
  }
};

module.exports = checkToken;
