import React, { useState, useEffect } from 'react'
import stationService from '../services/stationService'
import propTypes from 'prop-types'
import StationsView from './StationsView'

const Stations = ({ url }) => {
  const [stations, setStations] = useState([])
  useEffect(() => {
    stationService.getStations(url)
      .then((data) =>  {
        setStations(data)
      })
      .catch(() => {
        setStations([])
        return <div>Failed to get stations</div>
      })
  }, [])
  return <StationsView stations = { stations }/>
}

Stations.propTypes = {
  url: propTypes.string
}

export default Stations
