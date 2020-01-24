const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config/index");

const app = express();

mongoose.connect(config.databaseURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors());
app.use(express.json());
app.use("/api", require("./api"));

const port = config.port || 3333;
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
