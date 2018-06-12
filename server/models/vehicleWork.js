const mongoose = require('mongoose');
const {Vehicle} = require('./vehicle');
const {DailyReport} = require('./dailyReport');

var VehicleWorkSchema = new mongoose.Schema({
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
    require: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle',
    required: true
  },
  dailyReport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DailyReport'
  }
});

var VehicleWork = mongoose.model('VehicleWork', VehicleWorkSchema);

module.exports = {VehicleWork};