const mongoose = require("monogose");

const ProjectSchema = new mongoose.ProjectSchema(
  {
    title: String,
    tasks: [String],
    dateCreated: Date,
  },
  { collection: "projects" }
);

const model = mongoose.model("ProjectSchema", ProjectSchema);

module.exports = model;
