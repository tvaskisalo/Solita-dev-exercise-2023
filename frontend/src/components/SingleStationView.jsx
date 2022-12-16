import React from 'react'
import { useParams } from 'react-router-dom'


const SingleStationView = () => {
  const name = useParams().name
  console.log(name)
  return (
    <div>SingleStationView</div>
  )
}

export default SingleStationView
