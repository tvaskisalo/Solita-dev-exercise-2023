import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button'
import { useNavigate } from 'react-router-dom'

const Navigationbar = () => {
  const navigate = useNavigate()
  return (
    <AppBar position="static">
      <Toolbar variant='dense'>
        <Button sx={{ mx:'auto' }} onClick={ () => navigate('/stations') } variant='contained' color='info'> View stations </Button>
        <Button sx={{ mx:'auto' }} onClick={ () => navigate('/station') } variant='contained' color='info'> View station data </Button>
        <Button sx={{ mx:'auto' }} onClick={ () => navigate('/trips') } variant='contained' color='info'> View trips </Button>
        <Button sx={{ mx:'auto' }} onClick={ () => navigate('/addTrip') } variant='contained' color='info'> Add trip </Button>
        <Button sx={{ mx:'auto' }} onClick={ () => navigate('/addStation') } variant='contained' color='info'> Add station </Button>
      </Toolbar>
    </AppBar>
  )

}

export default Navigationbar