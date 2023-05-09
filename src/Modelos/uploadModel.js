const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Upload = new Schema({
  name: { type: String },
  src: { type: String },
});

module.exports = mongoose.model("uploads", Upload);