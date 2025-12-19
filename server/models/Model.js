const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  filename: String,
  url: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Model", modelSchema);
