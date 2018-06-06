const mongoose = require('mongoose');
const {Crew} = require('./crew');
const {DailyReport} = require('./dailyReport');

var JobsiteSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  location_url: {
    type: String
  },
  description: {
    type: String,
    trim: true,
  },
  jobcode: {
    type: String,
    trim: true
  },
  crews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crew'
  }],
  dailyReports: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DailyReport'
  }]
});

var Jobsite = mongoose.model('Jobsite', JobsiteSchema);

module.exports = {Jobsite};