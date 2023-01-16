import React, { useState } from 'react'
import propTypes from 'prop-types'
import TripsGrid from './TripsGrid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const TripsView = ({ trips }) => {
  //Filter states
  const [departure_time, setDeparture_time] = useState('')
  const [return_time, setReturn_time] = useState('')
  const [departure_station_name, setDeparture_station_name] = useState('')
  const [return_station_name, setReturn_station_name] = useState('')
  const [distance_min, setDistance_min] = useState(0)
  const [duration_min, setDuration_min] = useState(0)
  const [distance_max, setDistance_max] = useState(Number.MAX_SAFE_INTEGER)
  const [duration_max, setDuration_max] = useState(Number.MAX_SAFE_INTEGER)

  const filter = (trip) => {
    const valid = (
      //Filter departure and return time
      trip.departure_time.includes(departure_time) &&
      trip.return_time.includes(return_time) &&
      //Filter station names, case insensitive
      trip.departure_station_name.toLowerCase().includes(departure_station_name) &&
      trip.return_station_name.toLowerCase().includes(return_station_name) &&
      //Filter duration to be in between given values
      duration_min <= trip.duration &&
      trip.duration < duration_max &&
      //Filter distance to be in between given values
      distance_min <= trip.distance &&
      trip.distance < distance_max
    )
    return valid
  }

  //Return the trips as a grid and provide filters.
  //All the TextField components filter the grid based on the values that they are given
  //Distance and duration max change the value to large integer when the field is empty
  return <Box sx = {{ display: 'flex', my :5 }}>
    <TripsGrid trips = { trips.filter(trip => filter(trip)) } />
    <div>
      <div>
        <TextField id = 'departureTimeFilter' sx = {{ mb: 2, mx: 2 }}
          label='Filter departure time' type = 'search'
          onChange = { (event) => setDeparture_time(event.target.value) }/>
      </div>
      <div>
        <TextField id = 'returnTimeFilter' sx = {{ m: 2 }}
          label = 'Filter return time' type = 'search'
          onChange = { (event) => setReturn_time(event.target.value) }/>
      </div>
      <div>
        <TextField id = 'departureStationNameFilter' sx = {{ m: 2 }}
          label = 'Filter departure station name' type = 'search'
          onChange = { (event) => setDeparture_station_name(event.target.value.toLowerCase()) }/>
      </div>
      <div>
        <TextField id = 'returnStationNameFilter' sx = {{ m: 2 }}
          label = 'Filter return station name' type = 'search'
          onChange = {(event) => setReturn_station_name(event.target.value.toLowerCase()) }/>
      </div>
      <div>
        <TextField id = 'distanceMinFilter' sx = {{ m: 2 }}
          label = 'Distance minimum' type = 'number'
          onChange = {(event) => setDistance_min(event.target.value) }/>
      </div>
      <div>
        <TextField id = 'distanceMaxFilter' sx = {{ m: 2 }}
          label = 'Distance maximum' type = 'number'
          onChange = { (event) => setDistance_max(!event.target.value
            ? Number.MAX_SAFE_INTEGER
            : event.target.value) }/>
      </div>
      <div>
        <TextField id = 'durationMinFilter' sx = {{ m: 2 }}
          label = 'Duration minimum' type = 'number'
          onChange = {(event) => setDuration_min(event.target.value) }/>
      </div>
      <div>
        <TextField id = 'durationMaxFilter' sx = {{ m: 2 }}
          label = 'Duration maximum' type = 'number'
          onChange = { (event) => setDuration_max(!event.target.value
            ? Number.MAX_SAFE_INTEGER
            : event.target.value) }/>
      </div>
    </div>
  </Box>
}

TripsView.propTypes = {
  trips: propTypes.arrayOf(
    propTypes.shape({
      departure_time: propTypes.string,
      return_time: propTypes.string,
      departure_station: propTypes.shape({
        id: propTypes.string,
        name: propTypes.string,
        station_id: propTypes.number
      }),
      return_station: propTypes.shape({
        id: propTypes.string,
        name: propTypes.string,
        station_id: propTypes.number
      }),
      distance: propTypes.number,
      duration: propTypes.number,
    })
  )
}

export default TripsView
