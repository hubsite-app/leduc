var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/BowMarkApp').then(connection => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.log(error.message);
});

module.exports = {mongoose};