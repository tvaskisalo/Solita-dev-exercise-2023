import React, { useState } from 'react'
import propTypes from 'prop-types'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

const StationForm = ({ addStation }) => {
  const [name, setName] = useState('')
  const [stationId, setStationId] = useState('')
  const handleSubmit = (event) => {
    event.preventDefault()
    addStation(name, stationId)
  }
  return (
    <Box sx = {{ display: 'flex' }}>
      <form onSubmit = { handleSubmit }>
        <div>
          <TextField sx = {{ m:1 }} id = 'StationNameInput'
            label = 'Station name' variant = 'outlined'
            helperText = 'Unique non-empty string'
            onChange = { (event) => setName(event.target.value) }
          />
          <TextField sx = {{ m:1 }} id = 'StationIdInput'
            label ='Station id' variant = 'outlined'
            helperText = 'Unique non-negative integer'
            type = 'number'
            onChange = { (event) => setStationId(event.target.value) }
          />
        </div>
        <Button id = 'StationSubmitButton' variant = 'contained' type = 'submit'>
          Add trip
        </Button>
      </form>
    </Box>
  )
}

StationForm.propTypes = {
  addStation: propTypes.func
}

export default StationForm
