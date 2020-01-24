const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  databaseURL: process.env.DB_URI,
  secret: process.env.SECRET,
  tokenExpiration: process.env.TOKEN_EXPIRATION
};
