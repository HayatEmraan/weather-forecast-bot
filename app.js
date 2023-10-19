const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const router = require("./src/routes/routes");
const morgan = require("morgan");
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);


app.use(morgan("dev"));

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is up!");
});

app.use("/api/v1", router);

module.exports = app;
