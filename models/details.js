const mongoose = require("mongoose");

const detailsSchema = new mongoose.Schema({
  dob: Date,
  image: String,
  headline: String,
  about: String,
  resume: String,
  website: String,
  github: String,
  skills: String,
  language: String,
  experience: Number,
  secondary: Number,
  seniorSecondary: Number,
  yearOfPass: Number,
  currentGpa: Number,
  yearOfGrad: Number,
  course: String,
  school: String,
  college: String,
  city: String,
  state: String,
  Country: String,
  openToWork: Boolean,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

detailsSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Details", detailsSchema);
