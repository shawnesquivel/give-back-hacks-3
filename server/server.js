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

app.post("/api/createproject", async (req, res) => {
  console.log("Inside the Create Project Endpoint");
  console.log("req.body:", req.body);

  const {
    token,
    userAssigned,
    title,
    description,
    keywords,
    time,
    type,
    size,
    donationAmount,
    donationReason,
    itemsYouHaveArray,
    itemsYouNeedArray,
    volunteersYouHaveArray,
    volunteersYouNeedArray,
    issuesArray,
  } = req.body;

  console.log(
    "Received Request:",
    token,
    userAssigned,
    title,
    description,
    keywords,
    time,
    type,
    size,
    donationAmount,
    donationReason,
    itemsYouHaveArray,
    itemsYouNeedArray,
    volunteersYouHaveArray,
    volunteersYouNeedArray,
    issuesArray
  );

  let projectData;

  try {
    let influencerRecord = "";
    influencerRecord._id = "";

    const userRecord = await findUserByUsername(userAssigned);

    if (!userRecord) {
      console.log("no user found");
    } else {
      console.log("userRercord", userRecord);
    }

    // Create a project
    const res = await Project.create({
      organizerAssigned: userRecord._id,
      title,
      description,
      keywords,
      time,
      type,
      size,
      donationAmount,
      donationReason,
      itemsYouHaveArray,
      itemsYouNeedArray,
      volunteersYouHaveArray,
      volunteersYouNeedArray,
      issuesArray,
      dateCreated: "2022-11-25",
      date: "2022-12-25",
    });
    console.log("Project was created:", res);

    projectData = res;

    await User.updateOne(
      { _id: userRecord._id },
      {
        $push: { currentProjects: res._id },
      }
    );
    console.log("Project added to user");
  } catch (err) {
    console.log(err);

    throw err;
  }
  res.json({ status: "OK", project: projectData });
});

app.post("/api/getuser", async (req, res) => {
  console.log("Inside the Get Profile Endpoint");
  // Payload contains JWT and user
  console.log(req.body);
  const { token } = req.body;
  console.log(token);

  try {
    const [user, _id] = verifyJWT(token);
    const userRecord = await findUser(_id);

    console.log("User Record", user, _id, userRecord);

    res.json({ status: "OK", user: userRecord });
  } catch (err) {
    console.log(err);
    res.json({ status: "Error", error: "Could not verify identity" });
  }
});

// Get a single project based on its ID
app.post("/api/getproject", async (req, res) => {
  console.log("Inside the Get Project Endpoint");
  console.log(req.body);
  const { projectID } = req.body;

  try {
    const projectRecord = await Project.findOne({
      _id: mongoose.Types.ObjectId(projectID),
    });

    if (projectRecord) {
      console.log("got the project!");
    } else {
      console.log("cannot find project");
    }

    console.log("Retrieved the project", projectRecord);
    res.json({ status: "got project!", project: projectRecord });
  } catch (err) {
    console.log(err);
    res.json({ status: "Error", error: "Could not find project" });
  }
});

// Get all projects
app.get("/api/getallprojects", async (req, res) => {
  try {
    console.log("getting all projects");

    // step 1: Return all Projects
    const allProjects = await Project.find({});

    res.send(allProjects);
    // return the projects
  } catch (error) {
    console.log(error);
  }
});
// port
const findUser = async (_id) => {
  return User.findOne({ _id });
};
const verifyJWT = (token) => {
  // Verify the user, return the user + id
  const user = jwt.verify(JSON.parse(token).token, process.env.JWT_SECRET_KEY);
  const _id = user.id;
  return [user, _id];
};
const findUserByUsername = async (username) => {
  return User.findOne({ username });
};
