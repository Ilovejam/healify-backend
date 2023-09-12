const mongoose = require("mongoose");

const HealifySchema = new mongoose.Schema({
  languages: {
    type: [String],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  businessName: {
    type: String,
  },
  specialties: {
    type: [String],
  },
  description: {
    type: String,
  },
  location: {
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    country: {
      type: String,
    },
  },
  yearsOfPractice: {
    type: Number,
  },
  sessionType: {
    type: [String],
  },
  education: {
    type: [String],
  },
  inspiration: String,
  successStory: String,
  hobbies: {
    type: [String],
  },
  certifications: {
    type: [String],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const Healify = mongoose.model("Healify", HealifySchema);

module.exports = Healify;
