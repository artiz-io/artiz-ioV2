'use strict';

const assert = require('assert');
const mongoose = require('mongoose');

// Set promises for Mongoose
mongoose.Promise = Promise

module.exports = function(options) {
  assert(options.connection)

  console.info(`Trying to connect MongoDB to ${options.connection}`)
  mongoose.connect(options.connection)

  mongoose.connection.on('error', (e) => {
    console.error('MongoDB Connection Error. Please make sure that MongoDB is running.', e)
    process.exit(1)
  })

  mongoose.connection.once('open', function() {
    console.info('Connected to MongoDB');
  })

  return mongoose.connection
}