import React, { useState } from 'react'
import propTypes from 'prop-types'
import StationsGrid from './StationsGrid'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

const StationsView = ({ stations }) => {
  const [name, setName] = useState('')
  //Update the name (case insensitive) to filter stations.
  const update_filter = (event) => setName(event.target.value.toLowerCase())
  if (stations.length === 0) {
    return <div>Loading...</div>
  }
  return <div>
    <Box sx={{ display: 'flex', m: 5 }}>
      <StationsGrid stations={stations.filter(station => station.name.toLowerCase().includes(name))} />
      <TextField sx={{ mx: 5 }} label='Filter by name' type='search' onChange={(event) => update_filter(event)}/>
    </Box>
  </div>
}

StationsView.propTypes = {
  stations: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string,
      station_id: propTypes.number
    })
  )
}

export default StationsView
