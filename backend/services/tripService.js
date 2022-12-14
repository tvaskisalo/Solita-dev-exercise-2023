const Trip = require('../models/trip')
const Station = require('../models/station')
const { validateTime, validateDistance, validateDuration, validateStationName, validateDurationWithTimes } = require('../utils/validators')

//Departure_time and return_time must be valid dates and return time must be roughly duration amount of minutes ahead of departure_time
//departure_station and return_station must be stations from the database
//distance must be an integer larger than 9
//duration must be and integer larger than 9 and roughly equal the difference between departure_time and return_time
const addTrip = async(
  departure_time,
  return_time,
  departure_station,
  return_station,
  distance,
  duration
) => {
  //validate args
  if (
    !validateTime(departure_time) ||
    !validateTime(return_time) ||
    !departure_station ||
    !return_station ||
    !validateDistance(distance) ||
    !validateDurationWithTimes(departure_time, return_time, duration)
  ) {
    const e = new Error('Invalid or missing trip information')
    e.name = 'ValidationError'
    throw e
  }

  const new_trip = new Trip({
    departure_time,
    return_time,
    departure_station: departure_station._id,
    return_station: return_station._id,
    distance,
    duration
  })
  return await new_trip.save()
}
//Returns all trips that match the given arguments.
//If no arguments are given, returns all trips.
//Invalid arguments are ignored
const getTrips = async(
  departure_time,
  return_time,
  departure_station_name,
  return_station_name,
  distance,
  duration
) => {
  let departure_station = undefined
  if (validateStationName(departure_station_name)) {
    departure_station = await Station.findOne({ name: departure_station_name })
  }
  let return_station = undefined
  if (validateStationName(return_station_name)) {
    return_station = await Station.findOne({ name: return_station_name })
  }
  //Queries all for trips that fit given filters. If no value is given for parameter, it is a wildcard.
  //This works, since all fields must exist on all trips. There probably exists a better way.
  return await Trip.find({
    departure_time: validateTime(departure_time) ? departure_time : { '$exists': true },
    return_time: validateTime(return_time) ? return_time : { '$exists': true },
    departure_station: departure_station ? departure_station._id : { '$exists': true },
    return_station: return_station ? return_station._id : { '$exists': true },
    distance: validateDistance(distance) ? Number(distance) : { '$exists': true },
    duration: validateDuration(duration) ? Number(duration) : { '$exists': true }
  }).populate('departure_station').populate('return_station')
}

//This refers to the id in the mongodb NOT station_id
const getTripById = async(id) => {
  if (id === undefined) {
    const e = new Error('Missing id')
    e.name = 'ValidationError'
    throw e
  }
  return await Trip.findById(id)
}

module.exports = {
  addTrip,
  getTrips,
  getTripById
}

