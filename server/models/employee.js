const mongoose = require('mongoose');

var EmployeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
    unique: true
  },
  jobTitle: {
    type: String,
    trim: true
  }
});

var Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = {Employee};