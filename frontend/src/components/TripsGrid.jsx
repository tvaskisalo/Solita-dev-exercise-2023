import React from 'react'
import propTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'

const columns  = [
  { field: 'departure_time', headerName: 'Departure time ', width: 180 },
  { field: 'return_time', headerName: 'Return time ', width: 180 },
  { field: 'departure_station_name', headerName: 'Departure Station ', width: 180 },
  { field: 'departure_station_station_id', headerName: 'Departure Station id ', width: 180, type: 'number' },
  { field: 'return_station_name', headerName: 'Return Station ', width: 180 },
  { field: 'return_station_station_id', headerName: 'Return Station id', width: 180, type: 'number' },
  { field: 'distance', headerName: 'Distance (km)', width: 180, type: 'number' },
  { field: 'duration', headerName: 'Duration (min)', width: 180, type: 'number' },
]
const Trips = ({ trips }) => {
  const parsed_trips = trips.map(trip => {
    return {
      ...trip,
      distance: trip.distance/1000,
      duration: trip.duration/60,
      departure_station_name: trip.departure_station.name,
      departure_station_station_id: trip.departure_station.station_id,
      return_station_name: trip.return_station.name,
      return_station_station_id: trip.return_station.station_id
    }
  })
  return <Box sx={{ height: 2711, width: '90%', m: 5, align: 'center' }}>
    <DataGrid
      rows={parsed_trips}
      columns={columns}
      pageSize={50}
      rowsPerPageOptions={[50]}
      disableSelectionOnClick
      experimentalFeatures={{ newEditingApi: true }}
    />
  </Box>
}
Trips.propTypes = {
  trips: propTypes.arrayOf(
    propTypes.shape({
      departure_time: propTypes.string,
      return_time: propTypes.string,
      departure_station: propTypes.shape({
        id: propTypes.string,
        name: propTypes.string,
        station_id: propTypes.number
      }),
      return_station: propTypes.shape({
        id: propTypes.string,
        name: propTypes.string,
        station_id: propTypes.number
      }),
      distance: propTypes.number,
      duration: propTypes.number,
    })
  )
}

export default Trips