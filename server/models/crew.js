const mongoose = require('mongoose');
const {EmployeeSchema} = require('./employee');
const {VehicleSchema} = require('./vehicle');
const {JobsiteSchema} = require('./jobsite');

var CrewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
    unique: true
  },
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }],
  vehicles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  }],
  jobsites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobsite'
  }]
});

var Crew = mongoose.model('Crew', CrewSchema);

module.exports = {Crew};