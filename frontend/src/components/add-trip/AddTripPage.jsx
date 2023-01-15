import React, { useState } from 'react'
import TripForm from './TripForm'
import tripService from '../../services/tripService'
import propTypes from 'prop-types'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'

const AddTripView = ({ url }) => {
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const handleTripAddition = (
    departure_time,
    return_time,
    departure_station_name,
    departure_station_id,
    return_station_name,
    return_station_id,
    distance,
    duration
  ) => {
    tripService.addTrip(url,
      departure_time,
      return_time,
      departure_station_name,
      departure_station_id,
      return_station_name,
      return_station_id,
      distance,
      duration).then(() => {
      setSuccess(true)
      setErrMsg('')
      setTimeout(() => setSuccess(false), 5000)
    }).catch((error) => {
      setErrMsg(error.message)
      setSuccess(false)
      setTimeout(() => setErrMsg(''), 5000)
    })
  }
  return (
    <Container maxWidth='sm' sx={{ my: 5 }}>
      {errMsg ? <Alert sx={{ m:1 }} severity='error'>{errMsg}</Alert> : <div/>}
      {success ? <Alert sx={{ m:1 }} severity='success'>Added trip!</Alert>: <div/>}
      <TripForm addTrip={handleTripAddition}/>
    </Container>
  )
}
AddTripView.propTypes = {
  url: propTypes.string
}

export default AddTripView
