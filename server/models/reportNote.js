const mongoose = require('mongoose');
const {DailyReport} = require('./dailyReport');

var ReportNoteSchema = new mongoose.Schema({
  note: {
    type: String,
    trim: true
  },
  dailyReport: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'DailyReport'
  }
});

var ReportNote = mongoose.model('ReportNote', ReportNoteSchema);

module.exports = {ReportNote};
