import React, { useState, useEffect } from 'react'
import stationService from '../../services/stationService'
import propTypes from 'prop-types'
import StationsView from './StationsView'
import Alert from '@mui/material/Alert'

const Stations = ({ url }) => {
  const [stations, setStations] = useState([])
  const [errorMsg, setErrorMsg] = useState('')
  useEffect(() => {
    stationService.getStations(url)
      .then((data) =>  {
        setStations(data)
      })
      .catch(() => {
        setStations([])
        setErrorMsg('Failed to get stations')
      })
  }, [])
  if (errorMsg) {
    return <Alert severity = 'error'>{ errorMsg }</Alert>
  }
  if (stations.length === 0) {
    return <div>Loading...</div>
  }
  //Pass stations to StationsView, which will render them.
  return <StationsView stations = { stations }/>
}

Stations.propTypes = {
  url: propTypes.string
}

export default Stations
