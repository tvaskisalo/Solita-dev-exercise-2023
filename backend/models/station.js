const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const stationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  station_id: {
    type: Number,
    required: true,
    unique: true
  }
})

stationSchema.plugin(uniqueValidator)

stationSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Station', stationSchema)
