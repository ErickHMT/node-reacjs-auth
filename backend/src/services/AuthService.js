const User = require("../models/User");
const mailer = require("../modules/mailer");
const bcrypt = require("bcryptjs");
const config = require("../config/index");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

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
      throw new Error("Falha ao Cadastrar usuário", err);
    }
  },

  async Login({ email, password }) {
    const userRecord = await User.findOne({ email }).select("+password");

    if (!userRecord) {
      throw new Error("Usuário não encontrado");
    }

    const correctPassword = bcrypt.compareSync(password, userRecord.password);

    if (!correctPassword) {
      throw new Error("Senha incorreta");
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
  },

  async ForgotPassword({ email }) {
    const userRecord = await User.findOne({ email });

    if (!userRecord) {
      throw new Error("Usuário não encontrado");
    }

    const token = crypto.randomBytes(20).toString("hex");
    const now = new Date();
    now.setHours(now.getHours() + 1);

    await User.findByIdAndUpdate(userRecord.id, {
      $set: {
        passwordResetToken: token,
        passwordResetExpires: now
      }
    });

    mailer.sendMail(
      {
        to: email,
        from: "erickhmt@gmail.com",
        template: "auth/forgot_password",
        context: { token }
      },
      err => {
        if (err) {
          console.log(err);
          throw new Error("Erro ao enviar email!!");
        }
      }
    );

    return;
  },

  async ResetPassword({ email, token, password }) {
    const userRecord = await User.findOne({ email }).select(
      "+passwordResetToken passwordResetExpires"
    );

    if (!userRecord) {
      throw new Error("Usuário não encontrado");
    }
  }
};
