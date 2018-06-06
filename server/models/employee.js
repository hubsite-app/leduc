const mongoose = require('mongoose');
const {User} = require('./user');
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
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  crews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crew'
  }]
});

EmployeeSchema.statics.getAll = function() {
  var Employee = this
  var employeeArray = [];
  return Employee.find({}).then((employees) => {
    if (!employees) {return Promise.reject();}
    return new Promise(async (resolve, reject) => {
      await employees.forEach((employee) => {
        employeeArray[employee._id] = employee;
      });
      if (Object.keys(employeeArray).length > 0) {
        resolve(employeeArray);
      } else {
        reject('Error: Unable to create Employee array (check to ensure Employees have been created)');
      }
    });
  });
}

var Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = {Employee};