const User = require("../models/User");

module.exports = {
  async getByEmail(email) {
    const userRecord = await User.findOne({ email });

    if (!userRecord) {
      throw new Error("Usuário não encontrado");
    }

    return userRecord;
  }
};
