const express = require('express')
const stationService = require('../services/stationService')
const router = express.Router()

router.post('/', async(req, res) => {
  const name = req.body.name
  const station_id = req.body.station_id
  //No need for try-catch since errors are automatically sent to error-handler
  const station = await stationService.addStation(name, station_id)
  res.status(201).json(station)
})

router.get('/:name', async(req, res) => {
  const name = req.params.name
  //No need for try-catch since errors are automatically sent to error-handler
  const station = await stationService.getStation(name, undefined)
  if (!station) {
    res.status(404).end()
  }
  res.json(station)
})

router.get('/', async(req, res) => {
  //No need for try-catch since errors are automatically sent to error-handler
  const stations = await stationService.getStations()
  if (!stations || stations.length === 0) {
    res.status(404).end()
  }
  res.json(stations)
})

module.exports = router
