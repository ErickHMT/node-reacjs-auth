const User = require("../models/User");
const bcrypt = require("bcryptjs");
const config = require("../config/index");
const jwt = require("jsonwebtoken");

module.exports = {
  async SignUp({ email, password, name }) {
    const passwordHashed = bcrypt.hashSync(password);

    try {
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
    } catch (err) {
      console.error(err);
      return new Error("Falha ao Cadastrar usuário", err);
    }
  },

  async Login({ email, password }) {
    const userRecord = await User.findOne({ email }).select("+password");

    if (!userRecord) {
      return new Error("Usuário não encontrado");
    }

    const correctPassword = bcrypt.compareSync(password, userRecord.password);

    if (!correctPassword) {
      return new Error("Senha incorreta");
    }

    return {
      user: {
        email: userRecord.email,
        name: userRecord.name
      },
      token: this.generateJWT(userRecord)
    };
  },

  generateJWT(user) {
    const { _id, name, email } = user;

    const data = { _id, name, email };
    const secret = config.secret;
    const expiration = config.tokenExpiration;

    return jwt.sign({ data }, secret, { expiresIn: expiration });
  }
};
