const router = require("express").Router();

router.use("/user", require("./routes/User"));
router.use("/auth", require("./routes/Auth"));

module.exports = router;
