const User = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("../config/index");
const jwt = require("jsonwebtoken");

module.exports = {
  async SignUp(userDTO) {
    const { email, password, name } = userDTO;
    const passwordHashed = bcrypt.hashSync(password);

    const userRecord = await User.create({
      password: passwordHashed,
      email,
      name
    });

    return {
      user: {
        email: userRecord.email,
        name: userRecord.name
      }
    };
  },

  async Login(userDTO) {
    const { email, password } = userDTO;

    const userRecord = await User.findOne({ email }).select("+password");

    if (!userRecord) {
      throw new Error("User not found");
    } else {
      console.log("validar senha: ", userRecord);
      const correctPassword = bcrypt.compareSync(password, userRecord.password);

      if (!correctPassword) {
        throw new Error("Incorrect password");
      }

      return {
        user: {
          email: userRecord.email,
          name: userRecord.name
        },
        token: this.generateJWT(userRecord)
      };
    }
  },

  generateJWT(user) {
    const { _id, name, email } = user;

    const data = { _id, name, email };
    const secret = config.secret;
    const expiration = config.tokenExpiration;

    return jwt.sign({ data }, secret, { expiresIn: expiration });
  }
};
