import React, { useEffect, useState } from 'react'
import tripService from '../services/tripService'
import propTypes from 'prop-types'
import TripsView from './TripsView'
import Alert from '@mui/material/Alert'


const Trips = ({ url }) => {
  const [trips, setTrips] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
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
    return <Alert severity='error'>{errorMsg}</Alert>
  }
  if (trips.length === 0) {
    return <div> Loading... </div>
  }
  return <TripsView trips = { trips }/>
}

Trips.propTypes = {
  url: propTypes.string
}

export default Trips
