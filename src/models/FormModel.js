const mongoose = require("mongoose");

const formSchema = new mongoose.Schema({
  name: String,
  company: String,
  gender: String,
  age: Number,
  email: String,
  contactNumber: String,
  query: String,
  disposition: String,
});

module.exports = mongoose.model("Form", formSchema);
