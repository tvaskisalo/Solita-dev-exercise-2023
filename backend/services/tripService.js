const Trip = require('../models/trip')
const Station = require('../models/station')
const { validateTime, validateDistance, validateDuration, validateStationName } = require('../utils/validators')
//It is slightly redundant to check the arguments here and in the router, but it does not hurt anything.

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
    !validateDuration(duration)
  ) {
    throw new Error('Invalid or missing trip information')
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
  })
}

const getTripById = async(id) => {
  if (id === undefined) {
    throw new Error('Missing id')
  }
  return await Trip.findById(id)
}

module.exports = {
  addTrip,
  getTrips,
  getTripById
}

