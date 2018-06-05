const mongoose = require('mongoose');
const {Vehicle} = require('./vehicle');
const {DailyReport} = require('./dailyReport');

var VehicleWorkSchema = new mongoose.Schema({
  hours: {
    type: Number
  },
  jobTitle: {
    type: String,
    require: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  dailyReport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DailyReport'
  }
});

var VehicleWork = mongoose.model('VehicleWork', VehicleWorkSchema);

module.exports = {VehicleWork};