const mongoose = require('mongoose')

const tripSchema = new mongoose.Schema({
  departure_time: {
    type: String,
    required: true
  },
  return_time: {
    type: String,
    required: true,
  },
  departure_station: {
    type: mongoose.Schema.Types.ObjectID,
    ref: 'Station',
    required: true
  },
  return_station: {
    type: mongoose.Schema.Types.ObjectID,
    ret: 'Station',
    required: true
  },
  distance: {
    type: Number,
    min: 10,
    required: true
  },
  duration: {
    type: Number,
    min: 10,
    required: true
  }
})

tripSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})


module.exports = mongoose.model('Trip', tripSchema)
