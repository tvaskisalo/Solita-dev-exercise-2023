const Station = require('../models/station')
const { validateStationName, validateId } = require('../utils/validators')


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
  return await Station.findOne({
    station_id: validateId(id) ? Number(id) : { $exists: true },
    name: validateStationName(name) ? name : { $exists: true }
  })
}

const getStations = async() => {
  return await Station.find({})
}

module.exports = {
  addStation,
  getStation,
  getStations,
}
