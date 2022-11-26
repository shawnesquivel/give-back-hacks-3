const mongoose = require("mongoose");

// the schema describes the shape of the model
// option: collection - sets the collection name, otherwises the name will be pluralized
const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    name: String,
    currentProjects: [{ type: mongoose.Schema.Types.ObjectId }],
    interests: [{ type: String }],
    skills: [{ type: String }],
    certificationType: String,
    certificationDescription: String,
    certificationExpiry: String,
    certificationFIle: String,
    dob: String,
    address: String,
    license: String,
  },
  { collection: "users" }
);

// mongoose will use the 'collection' name users instead of userschemas
// the model is the instance of the schema
const model = mongoose.model("UserSchema", UserSchema);

module.exports = model;
