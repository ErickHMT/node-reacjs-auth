const router = require("express").Router();
const User = require("../../models/User");

router.get("/user", async (req, res) => {
  const users = await User.find();
  return res.json(users);
});

router.post("/user", async (req, res) => {
  const { email } = req.body;

  try {
    if (await User.findOne({ email }))
      return res.status(400).json({ message: "User already exists" });

    const user = await User.create(req.body);
    user.password = undefined;

    return res.json({});
  } catch (err) {
    return res.status(400).json({ message: "Registration failed" });
  }
});

router.put("/user/:id", async (req, res) => {
  const { id } = req.params;
  return res.json({});
});

router.delete("/user/:id", async (req, res) => {
  const { id } = req.params;
  return res.json({});
});

module.exports = router;
