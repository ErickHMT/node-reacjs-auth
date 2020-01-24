const router = require("express").Router();
const AuthService = require("../../services/AuthService");

router.post("/signup", async (req, res) => {
  const { email, name } = await AuthService.SignUp(req.body);

  return res.json({ message: "Cadastro realizado" });
});

router.post("/login", async (req, res) => {
  const response = await AuthService.Login(req.body);

  res.json(response);
});

module.exports = router;
