import React, { useState } from 'react'
import propTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const TripForm = ({ addTrip }) => {
  const [depTime, setDepTime] = useState('')
  const [retTime, setRetTime] = useState('')
  const [depStationName, setDepStationName] = useState('')
  const [depStationId, setDepStationId] = useState(0)
  const [retStationName, setRetStationName] = useState('')
  const [retStationId, setRetStationId] = useState(0)
  const [distance, setDistance] = useState(0)
  const [duration, setDuration] = useState(0)
  const handleSubmit = (event) => {
    event.preventDefault()
    addTrip(depTime, retTime, depStationName, depStationId, retStationName, retStationId, distance, duration)
  }
  return (
    <Box sx={{ display: 'flex' }}>
      <form onSubmit = {handleSubmit}>
        <div>
          <TextField sx={{ m:1 }} id='DepartureTimeInput' label='Departure time' variant='outlined' helperText='format: YYYY-MM-DDTHH:MM:SS' onChange = {(event) => setDepTime(event.target.value) } />
          <TextField sx={{ m:1 }} id='ReturnTimeInput' label='Return time' variant='outlined' helperText='format: YYYY-MM-DDTHH:MM:SS' onChange = {(event) => setRetTime(event.target.value) } />
        </div>
        <div>
          <TextField sx={{ m:1 }} id='DepartureNameInput' label='Departure station name' variant='outlined' helperText='Unique non-empty string' onChange = {(event) => setDepStationName(event.target.value) } />
          <TextField sx={{ m:1 }} id='DepartureIdInput' label='Departure station id' variant='outlined' helperText='Unique non-negative integer' type='number' onChange = {(event) => setDepStationId(event.target.value) } />
        </div>
        <div>
          <TextField sx={{ m:1 }} id='ReturnNameInput' label='Return station name' variant='outlined' helperText='Unique non-empty string' onChange = {(event) => setRetStationName(event.target.value) } />
          <TextField sx={{ m:1 }} id='ReturnIdInput' label='Return station id' variant='outlined' helperText='Unique non-negative integer' type='number' onChange = {(event) => setRetStationId(event.target.value) } />
        </div>
        <div>
          <TextField sx={{ m:1 }} id='DistanceInput' label='Distance' variant='outlined' helperText='Integer larger or equal to 10' type='number' onChange = {(event) => setDistance(event.target.value) } />
        </div>
        <div>
          <TextField sx={{ m:1 }} id='DurationInput' label='Duration' variant='outlined' helperText='Integer larger or equal to 10, must roughly match the difference between Departure and Return time' type='number' onChange = {(event) => setDuration(event.target.value) } />
        </div>
        <Button id='TripSubmitButton' variant='contained' type='submit'>Add trip </Button>
      </form>
    </Box>
  )
}

TripForm.propTypes = {
  addTrip: propTypes.func
}

export default TripForm
