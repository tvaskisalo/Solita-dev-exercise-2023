const express = require('express')
const tripService = require('../services/tripService')
const stationService = require('../services/stationService')
const { validateId, validateTime, validateDistance, validateDurationWithTimes, validateStationName } = require('../utils/validators')
const router = express.Router()


router.post('/', async(req, res) => {
  const body = req.body
  const departure_time = body.departure_time
  const return_time = body.return_time
  const departure_station_name = body.departure_station_name
  const departure_station_id = body.departure_station_id
  const return_station_name = body.return_station_name
  const return_station_id = body.return_station_id
  const distance = body.distance
  const duration = body.duration
  if (
    !validateTime(departure_time) ||
    !validateTime(return_time) ||
    !validateStationName(departure_station_name) ||
    !validateId(departure_station_id) ||
    !validateStationName(return_station_name) ||
    !validateId(return_station_id) ||
    !validateDistance(distance) ||
    !validateDurationWithTimes(departure_time, return_time, duration)
  ) {
    const e = new Error('Invalid or missing trip information')
    e.name = 'ValidationError'
    throw e
  }
  let departure_station = await stationService.getStation(departure_station_name, departure_station_id)
  if (!departure_station) {
    //No need for try-catch since errors are automatically sent to error-handler
    departure_station = await stationService.addStation(departure_station_name, departure_station_id)
  }

  let return_station = await stationService.getStation(return_station_name, return_station_id)
  if (!return_station) {
    //No need for try-catch since errors are automatically sent to error-handler
    return_station = await stationService.addStation(return_station_name, return_station_id)
  }

  const trip = await tripService.addTrip(
    departure_time,
    return_time,
    departure_station,
    return_station,
    distance,
    duration
  )
  res.status(201).json(trip)
})

router.get('/', async(req, res) => {
  const departure_time = req.query.departure_time
  const return_time = req.query.return_time
  const departure_station_name = req.query.departure_station_name
  const return_station_name = req.query.return_station_name
  const distance = req.query.distance
  const duration = req.query.duration
  const trips = await tripService.getTrips(
    departure_time,
    return_time,
    departure_station_name,
    return_station_name,
    distance,
    duration
  )
  if (!trips || trips.length === 0) {
    res.status(404).end()
  }
  res.json(trips)
})

module.exports = router
