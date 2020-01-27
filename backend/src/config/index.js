const dotenv = require("dotenv");
dotenv.config();

module.exports = {
  port: process.env.PORT,
  databaseURL: process.env.DB_URI,
  secret: process.env.SECRET,
  tokenExpiration: process.env.TOKEN_EXPIRATION,
  mail: {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
};
