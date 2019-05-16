const mongoose = require('mongoose');
const {DailyReport} = require('./dailyReport');

var MaterialShipmentSchema = new mongoose.Schema({
  shipmentType: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    require: true,
  },
  unit: {
    type: String,
    require: true
  },
  startTime: {
    type: Date,
  },
  endTime: {
    type: Date,
  },
  // Depreciated
  source: {
    type: String,
    trim: true
  },
  supplier: {
    type: String,
    trim: true
  },
  vehicle: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  },
  vehicleObject: {
    // Name
    source: {
      type: String,
      trim: true
    },
    vehicleType: {
      type: String,
      trim: true,
      default: "Truck"
    },
    vehicleCode: {
      type: String,
      trim: true
    }
  },
  dailyReport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DailyReport'
  }
});

var MaterialShipment = mongoose.model('MaterialShipment', MaterialShipmentSchema);

module.exports = {MaterialShipment};