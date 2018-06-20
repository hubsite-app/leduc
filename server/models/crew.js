const mongoose = require('mongoose');
const {Employee} = require('./employee');
const {Vehicle} = require('./vehicle');
const {Jobsite} = require('./jobsite');

var CrewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
    trim: true
  },
  employees: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Employee'
  }],
  vehicles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vehicle'
  }],
  jobsites: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Jobsite'
  }]
});

CrewSchema.statics.getAll = function() {
  var Crew = this
  var crewArray = [];
  return Crew.find({}).then((crews) => {
    if (!crews) {return Promise.reject();}
    return new Promise(async (resolve, reject) => {
      await crews.forEach((crew) => {
        crewArray[crew._id] = crew;
      });
      if (Object.keys(crewArray).length > 0) {
        resolve(crewArray);
      } else {
        reject('Error: Unable to create Crew array (check to ensure Crews have been created)');
      }
    });
  });
};

var Crew = mongoose.model('Crew', CrewSchema);

module.exports = {Crew};