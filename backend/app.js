const cors = require('cors')
const express = require('express')


const mongoose = require('mongoose')
const { MONGODB } = require('./utils/config')

mongoose.connect(MONGODB)
  .then(() => {
    console.log('Connected succesfully')
  })
  .catch(() => {
    console.log('error connecting')
  })

const app = express()

app.use(express.json())
app.use(cors())

module.exports = app
