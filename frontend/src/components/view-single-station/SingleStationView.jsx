import React from 'react'
import propTypes from 'prop-types'
import Box from '@mui/material/Box'
import { Grid } from '@mui/material'

const SingleStationView = ({ station }) => {
  return (
    <Box m={8}>
      <Grid container={true} wrap={'wrap'} spacing={4} m={'auto'}  sx={{ width:'30%' }} border={1}>
        <Grid item xs={12}><h1>{station.name}</h1></Grid>
        <Grid item xs={12}><div>Station id: {station.station_id}</div></Grid>
        { station.trips_starting
          ? <Grid item xs={12}><div>Total number of trips that start from this station: {station.trips_starting}</div></Grid>
          : <div/> }
        { station.trips_ending
          ? <Grid item xs={12}><div>Total number of trips that end to this station: {station.trips_ending}</div></Grid>
          : <div/> }
        { station.avg_distance_starting
          ? <Grid item xs={12}><div>Average distance of a trip starting from this station: {(station.avg_distance_starting/1000).toFixed(2)} km</div></Grid>
          : <div/> }
        { station.avg_distance_ending
          ? <Grid item xs={12}><div>Average distance of a trip ending to this station: {(station.avg_distance_ending/1000).toFixed(2)} km</div></Grid>
          : <div/>}
        { station.avg_duration_starting
          ? <Grid item xs={12}><div>Average duration of a trip starting from this station: {(station.avg_duration_starting/60).toFixed(2)} min</div></Grid>
          : <div/>}
        { station.avg_duration_ending
          ? <Grid item xs={12} sx={{ mb: 5 }}><div>Average duration of a trip ending to this station: {(station.avg_duration_ending/60).toFixed(2)} min</div></Grid>
          : <div/>}
      </Grid>
    </Box>
  )
}

SingleStationView.propTypes = {
  station: propTypes.shape({
    name: propTypes.string,
    station_id: propTypes.number,
    trips_starting: propTypes.number,
    trips_ending: propTypes.number,
    avg_duration_starting: propTypes.number,
    avg_duration_ending: propTypes.number,
    avg_distance_starting: propTypes.number,
    avg_distance_ending: propTypes.number
  })
}

export default SingleStationView
