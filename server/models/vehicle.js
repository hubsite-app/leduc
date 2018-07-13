const mongoose = require('mongoose');
const {Crew} = require('./crew');

var VehicleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    trim: true
  },
  vehicleCode: {
    type: String,
    trim: true,
    required: true,
    default: "noCode"
  },
  vehicleType: {
    type: String,
    trim: true,
    required: true,
    default: "General"
  },
  rental: {
    type: Boolean,
    required: true,
    default: false
  },
  sourceCompany: {
    type: String,
    trim: true,
    minlength: 1,
    required: true,
    default: "Bow Mark"
  },
  crews: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Crew'
  }]
});

VehicleSchema.statics.getAll = function() {
  var Vehicle = this
  var vehicleArray = [];
  return Vehicle.find({}).sort({vehicleCode: 'desc'}).then((vehicles) => {
    if (!vehicles) {return Promise.reject();}
    return new Promise(async (resolve, reject) => {
      await vehicles.forEach((vehicle) => {
        vehicleArray[vehicle._id] = vehicle;
      });
      if (Object.keys(vehicleArray).length > 0) {
        resolve(vehicleArray);
      } else {
        reject('Error: Unable to create Vehicle array (check to ensure there are vehicles created)');
      }
    });
  });
}

var Vehicle = mongoose.model('Vehicle', VehicleSchema);

module.exports = {Vehicle};