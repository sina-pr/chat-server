const mongoose = require('mongoose');

const instance = new mongoose.Schema({
  stid: {
    type: String,
    required: true,
    unique: true,
  },
  stname: {
    type: String,
    required: true,
  },
  stfamily: {
    type: String,
    required: true,
  },
});

const modelName = 'Student';

module.exports = mongoose.model(modelName, instance);
