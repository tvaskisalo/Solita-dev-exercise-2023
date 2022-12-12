const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  station_id: {
    type: String,
    required: true,
    unique: true
  }
})

stationSchema.plugin(uniqueValidator)

module.exports = mongoose.model('Station', stationSchema)
