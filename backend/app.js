const cors = require('cors')
const express = require('express')
require('express-async-errors')
const pingRouter = require('./controllers/ping')
const tripRouter = require('./controllers/tripRouter')
const stationRouter = require('./controllers/stationRouter')

const mongoose = require('mongoose')
const { MONGODB_URI } = require('./utils/config')
const errorHandler = require('./utils/errorhandler')

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected succesfully')
  })
  .catch((e) => {
    console.log(e.message)
    console.log('error connecting')
  })

const app = express()

app.use(express.json())
app.use(cors())

app.use('/ping', pingRouter)
app.use('/api/trip', tripRouter)
app.use('/api/station', stationRouter)

app.use(errorHandler)
module.exports = app
