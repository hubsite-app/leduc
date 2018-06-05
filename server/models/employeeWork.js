const mongoose = require('mongoose');
const {Employee} = require('./employee');
const {DailyReport} = require('./dailyReport');

var EmployeeWorkSchema = new mongoose.Schema({
  hours: {
    type: Number,
    required: true
  },
  jobTitle: {
    type: String,
    require: true
  },
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  },
  dailyReport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DailyReport'
  }
});

var EmployeeWork = mongoose.model('EmployeeWork', EmployeeWorkSchema);

module.exports = {EmployeeWork};