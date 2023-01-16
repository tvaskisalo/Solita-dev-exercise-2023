import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import AddStationPage from './components/add-station/AddStationPage'
import AddTripPage from './components/add-trip/AddTripPage'
import StationsPage from './components/view-stations/StationsPage'
import TripsPage from './components/view-trips/TripsPage'
import Navigationbar from './components/Navigationbar'
import SingleStationPage from './components/view-single-station/SingleStationPage'
const url = 'http://localhost:3001'

function App() {
  return (
    <div>
      <Navigationbar />
      <Routes>
        <Route path = '/' element = { <Navigate to = '/trips' /> }/>
        <Route path = '/stations' element = { <StationsPage url = { url +'/api/station' } /> }/>
        <Route path = '/stations/:name' element = { <SingleStationPage url = { url + '/api/station' } />}/>
        <Route path = '/addTrip' element = { <AddTripPage url = { url + '/api/trip' }/> }/>
        <Route path = '/addStation' element = { <AddStationPage url = { url +'/api/station' } /> }/>
        <Route path = '/trips' element = { <TripsPage url = { url + '/api/trip' }/> }/>
      </Routes>
    </div>
  )
}

export default App
