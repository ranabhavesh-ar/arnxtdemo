const mongoose = require("mongoose");

const modelSchema = new mongoose.Schema({
  filename: String,
  glbUrl: {
    type: String,
    required: true,
  },
  usdzUrl: {
    type: String,
    default: null, 
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Model", modelSchema);
