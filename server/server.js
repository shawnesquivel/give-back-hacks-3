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
const User = require("./model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

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

app.post("/api/register", async (req, res) => {
  console.log("Registration Received: req.body:", req.body);
  let {
    pwd: plainTextPwd,
    name,
    email,
    interests,
    skills,
    certificationType,
    certificationExpiry,
    certificationFile,
    address,
    dob,
    license,
  } = req.body;

  const encryptedPwd = await bcrypt.hash(plainTextPwd, 10); // 10 = how slow the algo will be

  // Create a record/document in the User model
  try {
    const res = await User.create({
      username: email,
      password: encryptedPwd,
      name,
      interests,
      skills,
      certificationType,
      certificationExpiry,
      certificationFile,
      address,
      dob,
      license,
    });
    console.log("User was created successfully: ", res);
  } catch (err) {
    console.log(err);
    if (err.code === 11000) {
      return res.json({
        status: "error",
        error: "Username already in use!",
      });
    }
    throw err;
  }
  res.json({ status: "OK" });
});

app.post("/api/login", async (req, res) => {
  const { user, pwd } = req.body;
  console.log("Server received login request:", user, pwd);

  // Find the User record
  // .lean() returns a Plain Old Java Object (POJO) instead of the entire
  const userRecord = await User.findOne({ username: user }).exec();

  console.log("User in Database:", userRecord);

  if (!userRecord) {
    return res.json({
      status: "error",
      error: "username/pwd is incorrect",
    });
  }

  // Compares the password and the hashed password
  if (await bcrypt.compare(pwd, userRecord.password)) {
    // Public information, do not put sensitive info.
    // The JWT signs the header/payload based on our signature.
    const token = jwt.sign(
      {
        id: userRecord._id,
        username: userRecord.username,
      },
      process.env.JWT_SECRET_KEY
    );
    console.log(token);
    if (token) {
      console.log("✅ signed JWT");

      res.json({ status: "OK", token: token });
    } else {
      console.log("❌ didnt sign jwt");
    }
  } else {
    console.log("inside the err2");
    return res.json({ status: "error" });
  }
});

// port
