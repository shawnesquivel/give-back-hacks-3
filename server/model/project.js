const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    title: String,
    tasks: [String],
    dateCreated: Date,
  },
  { collection: "projects" }
);

const model = mongoose.model("ProjectSchema", ProjectSchema);

module.exports = model;
