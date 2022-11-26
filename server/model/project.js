const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    organizerAssigned: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    volunteersAssigned: [{ type: mongoose.Schema.Types.ObjectId }],
    title: String,
    description: String,
    keywords: [{ type: String }],
    issuesArray: [{ type: String }],
    itemsYouHaveArray: [
      {
        name: String,
        qty: String,
        description: String,
      },
    ],
    itemsYouNeedArray: [
      {
        name: String,
        qty: String,
        description: String,
        price: Number,
      },
    ],
    volunteersYouHaveArray: [
      {
        position: String,
        qty: Number,
        certification: String,
        description: String,
      },
    ],
    volunteersYouNeedArray: [
      {
        position: String,
        qty: Number,
        certification: String,
        description: String,
      },
    ],
    donationAmount: Number,
    donationReason: String,
    time: String,
    type: String,
    size: Number,
    tasks: [String],
    dateCreated: Date,
  },
  { collection: "projects" }
);

const model = mongoose.model("ProjectSchema", ProjectSchema);

module.exports = model;
