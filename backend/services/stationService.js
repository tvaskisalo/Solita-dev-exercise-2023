const Station = require('../models/station')
const { validateStationName, validateId } = require('../utils/validators')
//It is slightly redundant to check the arguments here and in the router, but it does not hurt anything.

const addStation = async(name, id) => {
  if (!validateStationName(name) || !validateId(id)) {
    throw new Error('Invalid station name or id')
  }
  const new_station = new Station({ station_id: Number(id), name })
  return await new_station.save()
}

const getStationById = async(id) => {
  if (!validateId(id)) {
    throw new Error('Invalid id')
  }
  return await Station.findOne({ station_id: Number(id) })
}

const getStationByName = async(name) => {
  if (!validateStationName(name)) {
    throw new Error('Invalid name')
  }
  return await Station.findOne({ name })
}

const getStations = async() => {
  return await Station.find({})
}

module.exports = {
  addStation,
  getStationById,
  getStationByName,
  getStations
}
