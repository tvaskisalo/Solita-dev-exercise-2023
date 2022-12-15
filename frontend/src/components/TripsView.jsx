import React, { useEffect, useState } from 'react'
import tripService from '../services/tripService'
import propTypes from 'prop-types'
import TripsGrid from './TripsGrid'

const TripsView = ({ url }) => {
  const [trips, setTrips] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  useEffect(() => {
    //With all undefined, it fetches all trips
    tripService.getTrips(url, undefined, undefined, undefined, undefined, undefined, undefined)
      .then((data) => {
        setTrips(data)
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
  return <TripsGrid trips={trips} />
}

TripsView.propTypes = {
  url: propTypes.string
}

export default TripsView
