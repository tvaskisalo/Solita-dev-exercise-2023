import React, { useEffect, useState } from 'react'
import tripService from '../services/tripService'
import propTypes from 'prop-types'
import TripsGrid from './TripsGrid'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'

const TripsView = ({ url }) => {
  const [trips, setTrips] = useState([])
  const [errorMsg, setErrorMsg] = useState('')

  const [departure_time, setDeparture_time] = useState('')
  const [return_time, setReturn_time] = useState('')
  const [departure_station_name, setDeparture_station_name] = useState('')
  const [return_station_name, setReturn_station_name] = useState('')
  const [distance_min, setDistance_min] = useState(0)
  const [duration_min, setDuration_min] = useState(0)
  const [distance_max, setDistance_max] = useState(Number.MAX_SAFE_INTEGER)
  const [duration_max, setDuration_max] = useState(Number.MAX_SAFE_INTEGER)

  useEffect(() => {
    //With all undefined, it fetches all trips
    tripService.getTrips(url, undefined, undefined, undefined, undefined, undefined, undefined)
      .then((data) => {
        setTrips(data.map(trip => {
          return {
            ...trip,
            distance: trip.distance/1000,
            duration: trip.duration/60,
            departure_station_name: trip.departure_station.name,
            departure_station_station_id: trip.departure_station.station_id,
            return_station_name: trip.return_station.name,
            return_station_station_id: trip.return_station.station_id
          }
        }))
      })
      .catch(() => {
        setErrorMsg('Failed to fetch trips')
        setTrips([])
      })
  }, [])
  if (errorMsg) {
    return <div>{errorMsg}</div>
  }
  if (trips.length === 0) {
    return <div> Loading... </div>
  }
  return <Box sx={{ display: 'flex', my :5 }}>
    <TripsGrid trips={trips.filter(trip => {
      const valid = (
        trip.departure_time.includes(departure_time) &&
        trip.return_time.includes(return_time) &&
        trip.departure_station_name.toLowerCase().includes(departure_station_name) &&
        trip.return_station_name.toLowerCase().includes(return_station_name) &&
        duration_min <= trip.duration && trip.duration < duration_max &&
        distance_min <= trip.distance && trip.distance < distance_max
      )
      return valid
    })} />
    <div>
      <div><TextField sx={{ mx: 2 }} label='Departure time' type='search' onChange={(event) => setDeparture_time(event.target.value.toLowerCase())}/></div>
      <div><TextField sx={{ m: 2 }} label='Return time' type='search' onChange={(event) => setReturn_time(event.target.value.toLowerCase())}/></div>
      <div><TextField sx={{ m: 2 }} label='Departure station name' type='search' onChange={(event) => setDeparture_station_name(event.target.value.toLowerCase())}/></div>
      <div><TextField sx={{ m: 2 }} label='Return station name' type='search' onChange={(event) => setReturn_station_name(event.target.value.toLowerCase())}/></div>
      <div><TextField sx={{ m: 2 }} label='Distance min' type='number' onChange={(event) => setDistance_min(event.target.value)}/></div>
      <div><TextField sx={{ m: 2 }} label='Duration min' type='number' onChange={(event) => setDuration_min(event.target.value)}/></div>
      <div><TextField sx={{ m: 2 }} label='Distance max' type='number' onChange={(event) => setDistance_max(event.target.value < 10 ? Number.MAX_SAFE_INTEGER : event.target.value)}/></div>
      <div><TextField sx={{ m: 2 }} label='Duration max' type='number' onChange={(event) => setDuration_max(event.target.value < 10 ? Number.MAX_SAFE_INTEGER : event.target.value)}/></div>
    </div>
  </Box>
}

TripsView.propTypes = {
  url: propTypes.string
}

export default TripsView
