// import modules
require("dotenv").config();

const express = require("express");
const app = express();
const path = require("path");
const port = 5000;
// const request = require("request");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors"); // allow frontend to make requests to backend on different origins
// Very sensitive - keep safe.
const MONGOOSE_URL = "mongodb://127.0.0.1:27017/GiveBackHacks3";
const moment = require("moment");
const Project = require("./model/project");

// app
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(bodyParser.json());

// db
mongoose
  .connect(MONGOOSE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => {
    console.log(`Database connected at ${MONGOOSE_URL}`);
  })
  .catch((err) => console.log(err));

// middleware
app.use("/api/", express.static(path.join(__dirname, "static")));

app.listen(port, () => {
  console.log(`Server is online at Port ${port}`);
});

app.get("/", (req, res) => {
  res.send("welcome!");
});

// routes

// port
