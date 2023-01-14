import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddStationView from './components/AddStationView'
import AddTripView from './components/AddTripView'
import Stations from './components/Stations'
import Trips from './components/Trips'
import Navigationbar from './components/Navigationbar'
import SingleStation from './components/SingleStation'
const url = 'http://localhost:3001'

function App() {
  return (
    <div>
      <Navigationbar />
      <Routes>
        <Route path = '/' element = { <div>todo</div> }/>
        <Route path = '/stations' element = { <Stations url={ url +'/api/station' } /> }/>
        <Route path = '/stations/:name' element = { <SingleStation url = { url + '/api/station' } />}/>
        <Route path = '/addTrip' element = { <AddTripView url = { url + '/api/trip'}/> }/>
        <Route path = '/addStation' element = { <AddStationView url={ url +'/api/station' } /> }/>
        <Route path = '/trips' element = { <Trips url={ url + '/api/trip'}/> }/>
      </Routes>
    </div>
  )
}

export default App
