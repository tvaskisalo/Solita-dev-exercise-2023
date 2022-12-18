import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddStation from './components/AddStation'
import AddTrip from './components/AddTrip'
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
        <Route path = '/addTrip' element = { <AddTrip url = { url + '/api/trip'}/> }/>
        <Route path = '/addStation' element = { <AddStation url={ url +'/api/station' } /> }/>
        <Route path = '/trips' element = { <Trips url={ url + '/api/trip'}/> }/>
      </Routes>
    </div>
  )
}

export default App
