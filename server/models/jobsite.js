const mongoose = require('mongoose');

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
    minlength: 1
  }
});



var Jobsite = mongoose.model('Jobsite', JobsiteSchema);

module.exports = {Jobsite};