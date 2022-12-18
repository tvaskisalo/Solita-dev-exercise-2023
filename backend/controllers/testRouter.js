const express = require('express')
const router = express.Router()
const Station = require('../models/station')
const Trip = require('../models/trip')
const { import_csv } = require('../utils/csv_importer')

router.post('/reset', async(req, res) => {
  await Station.deleteMany()
  await Trip.deleteMany()
  res.status(200).end()
})

router.post('/initState', async(req, res) => {
  await import_csv('./tests/valid_data')
  res.status(201).end()
})

module.exports = router
