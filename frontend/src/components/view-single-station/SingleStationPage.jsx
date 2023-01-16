import SingleStationView from './SingleStationView'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import propTypes from 'prop-types'
import stationService from '../../services/stationService'

const SingleStationPage = ({ url }) => {
  const [station, setStation] = useState('')
  const [err, setErr] = useState('')
  const name = useParams().name
  const navigate = useNavigate
  if (!name) {
    navigate('/stations')
  }
  useEffect(() => {
    stationService.getStationByName(url, name)
      .then(data => {
        setStation(data)
      })
      .catch(e => {
        setErr(e.message)
      })
  }, [])
  if (err) {
    return <div>No station found</div>
  }
  if (!station) {
    return <div>Loading</div>
  }
  return <SingleStationView station = { station }/>
}

SingleStationPage.propTypes = {
  url: propTypes.string
}

export default SingleStationPage
