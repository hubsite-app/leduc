const mongoose = require('mongoose');
const {DailyReport} = require('./dailyReport');

var ProductionSchema = new mongoose.Schema({
  jobTitle: {
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
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  description: {
    type: String,
    trim: true
  },
  dailyReport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DailyReport'
  }
});

var Production = mongoose.model('Production', ProductionSchema);

module.exports = {Production};