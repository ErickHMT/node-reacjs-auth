const router = require("express").Router();

router.use("/user", require("./controllers/UserController"));
router.use("/auth", require("./controllers/AuthController"));

module.exports = router;
