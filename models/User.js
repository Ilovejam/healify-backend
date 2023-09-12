const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: {
    first: String,
    last: String
  },
  user_id: String,
  user_name: String,
  birthDate: Date,
  languages: [String],
  gender: String,
  phoneNumber: String,
  facebookHandle: String,
  twitterHandle: String,
  instagramHandle: String,
  businessName: String,
  specialties: [String],
  description: String,
  location: {
    city: String,
    state: String,
    country: String,
  },
  yearsOfPractice: Number,
  sessionType: [String],
  education: [String],
  inspiration: String,
  successStory: String,
  hobbies: [String],
  certifications: [String],
});

module.exports = mongoose.model("User", UserSchema);
