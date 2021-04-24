const mongoose = require("mongoose");

const url = process.env.MONGODB_URI;

console.log("connecting to", url);
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then((result) => {
    console.log("connected to mongodb", url);
  })
  .catch((error) => {
    console.log("error while connecting to mongodb", error);
  });

const userSchema = new mongoose.Schema({
  email: {
    type: "String",
    required: true,
  },
  fname: {
    type: "String",
    required: true,
  },
  lname: {
    type: "String",
    required: true,
  },
  role: {
    type: "String",
    required: true,
  },
  password: {
    type: "String",
    required: true,
    minlength:8
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.password;
  },
});

module.exports = mongoose.model("User", userSchema);
