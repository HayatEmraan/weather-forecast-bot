const express = require("express");
const app = express();
const cors = require("cors");
const router = require("./src/routes/routes");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is up!");
});

app.use("/api/v1", router);

module.exports = app;
