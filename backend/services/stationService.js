const Station = require('../models/station')
const { validateStationName, validateId } = require('../utils/validators')
const Trip = require('../models/trip')

//Valid name is a non-empty string
//Valid id is non-negative integer. Integer can be a number or string that can be parsed to number with Number()
const addStation = async(name, id) => {
  //Validate the props
  if (!validateStationName(name) || !validateId(id)) {
    const e  = new Error('Invalid station name or id')
    e.name = 'ValidationError'
    throw e
  }
  const new_station = new Station({ station_id: Number(id), name })
  return await new_station.save()
}

//Valid name is a non-empty string
//Valid id is non-negative integer. Integer can be a number or string that can be parsed to number with Number()
//Either name or id can be missing or invalid, but not both. Invalid arguments are ignored
const getStation = async(name, id) => {
  if (id === undefined && name === undefined) {
    const e = new Error('Missing name and id')
    e.name = 'ValidationError'
    throw e
  }
  if (!validateId(id) && !validateStationName(name)) {
    const e = new Error('Invalid station id and name')
    e.name = 'ValidationError'
    throw e
  }
  const station = await Station.findOne({
    station_id: validateId(id) ? Number(id) : { $exists: true },
    name: validateStationName(name) ? name : { $exists: true }
  })
  if (!station) {
    //Station was not found so return undefined
    return station
  }
  //Count the trips with departure_station/return_station being this station
  let trips_starting = await Trip.count({ departure_station: station._id })
  let trips_ending = await Trip.count({ return_station: station._id })
  let avg_distance_starting = await Trip.aggregate([
    {
      //Get all trips with this station being the departure_station
      $match: { departure_station: station._id }
    },
    {
      //Calculate distance average and set it to field avg_distance_starting
      $group: { _id: null, avg_distance_starting: { $avg: '$distance' } }
    }
  ])
  let avg_distance_ending = await Trip.aggregate([
    {
      //Get all trips with this station being the return_station
      $match: { return_station: station._id }
    },
    {
      //Calculate distance average and set it to field avg_distance_ending
      $group: { _id: null, avg_distance_ending: { $avg: '$distance' } }
    }
  ])
  let avg_duration_starting = await Trip.aggregate([
    {
      //Get all trips with this station being the departure_station
      $match: { departure_station: station._id }
    },
    {
      //Calculate distance average and set it to field avg_duration_starting
      $group: { _id: null, avg_duration_starting: { $avg: '$duration' } }
    }
  ])
  let avg_duration_ending = await Trip.aggregate([
    {
      //Get all trips with this station being the return_station
      $match: { return_station: station._id }
    },
    {
      //Calculate distance average and set it to field avg_duration_ending
      $group: { _id: null, avg_duration_ending: { $avg: '$duration' } }
    }
  ])
  //Parse the statistics
  trips_starting = trips_starting ? trips_starting : undefined
  trips_ending = trips_ending ? trips_ending : undefined
  avg_distance_ending = avg_distance_ending.length !== 0
    ? avg_distance_ending[0].avg_distance_ending
    : undefined
  avg_distance_starting = avg_distance_starting.length !== 0
    ? avg_distance_starting[0].avg_distance_starting
    : undefined
  avg_duration_ending = avg_duration_ending.length !== 0
    ? avg_duration_ending[0].avg_duration_ending
    : undefined
  avg_duration_starting = avg_duration_starting.length !== 0
    ? avg_duration_starting[0].avg_duration_starting
    : undefined
  return {
    id: station.id,
    _id: station._id,
    name: station.name,
    station_id: station.station_id,
    trips_starting,
    trips_ending,
    avg_distance_starting,
    avg_distance_ending,
    avg_duration_starting,
    avg_duration_ending,
  }
}

const getStations = async() => {
  return await Station.find({})
}

module.exports = {
  addStation,
  getStation,
  getStations,
}
