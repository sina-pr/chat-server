const mongoose = require('mongoose');

const instance = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
});

const modelName = 'Product';

module.exports = mongoose.model(modelName, instance);
