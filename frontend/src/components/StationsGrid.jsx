import React from 'react'
import propTypes from 'prop-types'
import { DataGrid } from '@mui/x-data-grid'
import Box from '@mui/material/Box'
import { useNavigate } from 'react-router-dom'

const columns = [
  { field: 'name', headerName: 'Station name', width: 180 },
  { field: 'station_id', headerName: 'Station id', width: 180 }
]

const StationsGrid = ({ stations }) => {
  const navigate = useNavigate()
  return <Box sx={{ height: 2711, width: '50%' }}>
    <DataGrid
      rows={stations}
      columns={columns}
      pageSize={50}
      rowsPerPageOptions={[50]}
      disableSelectionOnClick
      onRowClick={ (params) => navigate('/stations/' + params.row.name) }
      experimentalFeatures={{ newEditingApi: true }}
    />
  </Box>
}

StationsGrid.propTypes = {
  stations: propTypes.arrayOf(
    propTypes.shape({
      name: propTypes.string,
      station_id: propTypes.number
    })
  )
}

export default StationsGrid
