const mongoose = require('mongoose');
const {Employee} = require('./employee');
const {DailyReport} = require('./dailyReport');

var EmployeeWorkSchema = new mongoose.Schema({
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  jobTitle: {
    type: String,
    required: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee',
    required: true
  },
  dailyReport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DailyReport',
    require: true
  }
});

var EmployeeWork = mongoose.model('EmployeeWork', EmployeeWorkSchema);

module.exports = {EmployeeWork};