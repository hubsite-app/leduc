const mongoose = require('mongoose');
const {Jobsite} = require('./jobsite');
const {Crew} = require('./crew');

var DailyReportSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true
  },
  jobsite: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobsite'
  }, 
  crew: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crew'
  }
});