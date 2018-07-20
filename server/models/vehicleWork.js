const mongoose = require('mongoose');
const {Vehicle} = require('./vehicle');
const {DailyReport} = require('./dailyReport');

var VehicleWorkSchema = new mongoose.Schema({
  startTime: {
    type: Date
  },
  endTime: {
    type: Date
  },
  jobTitle: {
    type: String,
    required: true
  },
  hours: {
    type: Number,
    required: true
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