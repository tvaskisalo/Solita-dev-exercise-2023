const Station = require('../models/station')
const { validateStationName, validateId } = require('../utils/validators')

const addStation = async(name, id) => {
  //Validate the props
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

const getStations = async() => {
  return await Station.find({})
}

module.exports = {
  addStation,
  getStationById,
  getStations
}
