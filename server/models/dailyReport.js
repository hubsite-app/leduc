const mongoose = require('mongoose');
const {Jobsite} = require('./jobsite');
const {Crew} = require('./crew');
const {EmployeeWork} = require('./employeeWork');
const {VehicleWork} = require('./vehicleWork');
const {Production} = require('./production');
const {MaterialShipment} = require('./materialShipment');

var DailyReportSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  jobsite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobsite',
    required: true
  }, 
  crew: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crew',
    required: true
  },
  employeeWork: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EmployeeWork'
  }],
  vehicleWork: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'VehicleWork'
  }],
  production: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Production'
  }],
  materialShipment: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MaterialShipment'
  }]
});

var DailyReport = mongoose.model('DailyReport', DailyReportSchema);

module.exports = {DailyReport};