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

EmployeeWorkSchema.statics.getAll = function() {
  var EmployeeWork = this
  var employeeWorkArray = [];
  return EmployeeWork.find({}).then((works) => {
    if (!works) {return Promise.reject();}
    return new Promise(async (resolve, reject) => {
      await works.forEach((work) => {
        employeeWorkArray[work._id] = work;
      });
      if (Object.keys(employeeWorkArray).length > 0) {
        resolve(employeeWorkArray);
      } else {
        reject('Error: Unable to create Employee array (check to ensure Employees have been created)');
      }
    });
  });
};

var EmployeeWork = mongoose.model('EmployeeWork', EmployeeWorkSchema);

module.exports = {EmployeeWork};