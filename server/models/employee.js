const mongoose = require('mongoose');
const {Crew} = require('./crew');

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
  },
  crew: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crew'
  }
});

var Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = {Employee};