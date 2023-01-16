const cors = require('cors')
const express = require('express')
require('express-async-errors')
const pingRouter = require('./controllers/ping')
const tripRouter = require('./controllers/tripRouter')
const stationRouter = require('./controllers/stationRouter')
const mongoose = require('mongoose')
const { MONGODB_URI, IMPORT_DATA_PATH, NODE_ENV } = require('./utils/config')
const errorHandler = require('./utils/errorhandler')
const { import_csv } = require('./utils/csv_importer')


mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected succesfully')
  })
  .catch((e) => {
    console.log(e)
    console.log('error connecting')
  })
//Check if path for importable data is given
//Import the data to mongodb IF we are not in testing mode
if (
  (IMPORT_DATA_PATH) &&
  ((NODE_ENV === 'production') || (NODE_ENV === 'development'))
){
  import_csv(IMPORT_DATA_PATH)
    .then(() => {
      console.log('Data imported')
    })
    .catch((e) => {
      console.log(e.message)
      console.log('Failed to import data from ' + IMPORT_DATA_PATH)
    })
}

const app = express()

app.use(express.json())
app.use(cors())

//Enable test router only during testing mode.
if (NODE_ENV === 'test') {
  const testRouter = require('./controllers/testRouter')
  app.use('/test', testRouter)
}
app.use('/ping', pingRouter)
app.use('/api/trip', tripRouter)
app.use('/api/station', stationRouter)

app.use(errorHandler)
module.exports = app
