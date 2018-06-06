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

var MaterialShipment = mongoose.model('MaterialShipment', MaterialShipmentSchema);

module.exports = {MaterialShipment};