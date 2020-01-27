const router = require("express").Router();

router.use("/user", require("./UserController"));
router.use("/auth", require("./AuthController"));

module.exports = router;
