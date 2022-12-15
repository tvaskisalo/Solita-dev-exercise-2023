import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AddStation from './components/AddStation'
import AddTrip from './components/AddTrip'
import StationsView from './components/StationsView'
import TripsView from './components/TripsView'
const url = 'http://localhost:3001'
console.log(url)
function App() {
  return (
    <div>
      <Routes>
        <Route path = '/' element = { <div>todo</div> }/>
        <Route path = '/addTrip' element = { <AddTrip /> }/>
        <Route path = '/addStation' element = { <AddStation /> }/>
        <Route path = '/stations' element = { <StationsView /> }/>
        <Route path = '/trips' element = { <TripsView /> }/>
      </Routes>
    </div>
  )
}

export default App
