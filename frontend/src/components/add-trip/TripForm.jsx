import React, { useState } from 'react'
import propTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const TripForm = ({ addTrip }) => {
  const [departureTime, setDepartureTime] = useState('')
  const [returnTime, setReturnTime] = useState('')
  const [departureStationName, setDepartureStationName] = useState('')
  const [departureStationId, setDepartureStationId] = useState(0)
  const [returnStationName, setReturnStationName] = useState('')
  const [returnStationId, setReturnStationId] = useState(0)
  const [distance, setDistance] = useState(0)
  const [duration, setDuration] = useState(0)
  const handleSubmit = (event) => {
    event.preventDefault()
    addTrip(
      departureTime,
      returnTime,
      departureStationName,
      departureStationId,
      returnStationName,
      returnStationId,
      distance,
      duration
    )
  }
  return (
    <Box sx = {{ display: 'flex' }}>
      <form onSubmit = { handleSubmit }>
        <div>
          <TextField sx = {{ m:1 }} id = 'DepartureTimeInput'
            label = 'Departure time' variant = 'outlined'
            helperText = 'format: YYYY-MM-DDTHH:MM:SS'
            onChange = { (event) => setDepartureTime(event.target.value) }
          />
          <TextField sx = {{ m:1 }} id = 'ReturnTimeInput'
            label = 'Return time' variant = 'outlined'
            helperText = 'format: YYYY-MM-DDTHH:MM:SS'
            onChange = { (event) => setReturnTime(event.target.value) }
          />
        </div>
        <div>
          <TextField sx = {{ m:1 }} id = 'DepartureNameInput'
            label = 'Departure station name' variant = 'outlined'
            helperText = 'Unique non-empty string'
            onChange = { (event) => setDepartureStationName(event.target.value) }
          />
          <TextField sx = {{ m:1 }} id = 'DepartureIdInput'
            label = 'Departure station id' variant = 'outlined'
            helperText = 'Unique non-negative integer'
            type='number'
            onChange = { (event) => setDepartureStationId(event.target.value) }
          />
        </div>
        <div>
          <TextField sx = {{ m:1 }} id = 'ReturnNameInput'
            label = 'Return station name' variant = 'outlined'
            helperText = 'Unique non-empty string'
            onChange = { (event) => setReturnStationName(event.target.value) }
          />
          <TextField sx = {{ m:1 }} id = 'ReturnIdInput'
            label = 'Return station id' variant = 'outlined'
            helperText = 'Unique non-negative integer'
            type = 'number'
            onChange = { (event) => setReturnStationId(event.target.value) }
          />
        </div>
        <div>
          <TextField sx = {{ m:1 }} id = 'DistanceInput'
            label = 'Distance' variant = 'outlined'
            helperText = 'Distance of the trip in meters. Distance must be larger or equal to 10 meters'
            type='number'
            onChange = { (event) => setDistance(event.target.value) }
          />
        </div>
        <div>
          <TextField sx = {{ m:1 }} id = 'DurationInput'
            label = 'Duration' variant = 'outlined'
            helperText = 'Duration of the trip in seconds. Duration must be larger or equal to 10 seconds. Should roughly match the difference between Departure and Return time'
            type = 'number'
            onChange = { (event) => setDuration(event.target.value) }
          />
        </div>
        <Button id = 'TripSubmitButton' variant = 'contained' type = 'submit'>
          Add trip
        </Button>
      </form>
    </Box>
  )
}

TripForm.propTypes = {
  addTrip: propTypes.func
}

export default TripForm
