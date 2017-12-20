'use strict'

const co = require('co')
const mongoose = require('mongoose')

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  versionKey: false,
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
})

// duplicate _id to id
schema.virtual('id').get(function() {
  return this[MONGO_ID_FIELD].toHexString()
})

// plugins
schema.plugin(rootRequire('/api/lib/mongoose/pagination'))
schema.plugin(rootRequire('/api/lib/mongoose/patch'))

module.exports = mongoose.model('Subscriptions', schema)