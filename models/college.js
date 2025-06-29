const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: String
});

module.exports = mongoose.models.College || mongoose.model('College', collegeSchema);
