import React, { useState } from 'react'
import StationForm from './StationForm'
import stationService from '../../services/stationService'
import propTypes from 'prop-types'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'

const AddStationPage = ({ url }) => {
  const [errMsg, setErrMsg] = useState('')
  const [success, setSuccess] = useState(false)
  const handleStationAddition = (name, station_id) => {
    stationService.addStation(
      url,
      name,
      station_id
    ).then(() => {
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
    <Container maxWidth = 'sm' sx = {{ my: 5 }}>
      { errMsg
        ? <Alert sx = {{ m:1 }} severity = 'error'>{ errMsg }</Alert>
        : <div/> }
      { success
        ? <Alert sx = {{ m:1 }} severity = 'success'>Added station!</Alert>
        : <div/> }
      <StationForm addStation = { handleStationAddition }/>
    </Container>
  )
}

AddStationPage.propTypes = {
  url: propTypes.string
}

export default AddStationPage
