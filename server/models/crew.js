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
    type: Schema.Types.ObjectID,
    ref: 'Employee'
  }],
  vehicles: [{
    type: Schema.Types.ObjectID,
    ref: 'Vehicle'
  }],
  jobs: [{
    type: Schema.Types.ObjectID,
    ref: 'Jobsite'
  }]
});

var Crew = mongoose.model('Crew', CrewSchema);

module.exports = {Crew};