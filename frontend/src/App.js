import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddStation from './components/AddStation'
import AddTrip from './components/AddTrip'
import StationsView from './components/StationsView'
import TripsView from './components/TripsView'
import Navigationbar from './components/Navigationbar'
const url = 'http://localhost:3001'

function App() {
  return (
    <div>
      <Navigationbar />
      <Routes>
        <Route path = '/' element = { <div>todo</div> }/>
        <Route path = '/addTrip' element = { <AddTrip url = { url + '/api/trip'}/> }/>
        <Route path = '/addStation' element = { <AddStation url={ url +'/api/station' } /> }/>
        <Route path = '/stations' element = { <StationsView url={ url +'/api/station' } /> }/>
        <Route path = '/trips' element = { <TripsView url={ url + '/api/trip'}/> }/>
      </Routes>
    </div>
  )
}

export default App
