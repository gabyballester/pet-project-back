const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
  email: {
    type: String,
    unique: true
  },
  password: String,
  role: String,
  active: Boolean
});

module.exports = mongoose.model("User", userSchema);
