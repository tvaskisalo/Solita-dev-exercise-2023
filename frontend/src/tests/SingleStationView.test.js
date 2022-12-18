import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import SingleStationView from '../components/SingleStationView'

const station = {
  name: 'Käpylän asema',
  station_id: 1,
  trips_starting: 10,
  trips_ending: 20,
  avg_duration_starting: 180,
  avg_duration_ending: 240,
  avg_distance_starting: 10000,
  avg_distance_ending: 100
}

test('Single station data is shown', () => {
  render(<SingleStationView station={station}/>)
  expect(screen.getByText('Käpylän asema')).toBeDefined()
  expect(screen.getByText('Station id: 1')).toBeDefined()
  expect(screen.getByText('Total number of trips that start from this station: 10')).toBeDefined()
  expect(screen.getByText('Total number of trips that end to this station: 20')).toBeDefined()
  //Checking if seconds are turned to minutes
  expect(screen.getByText('Average distance of a trip starting from this station: 10.00 km')).toBeDefined()
  expect(screen.getByText('Average distance of a trip ending to this station: 0.10 km')).toBeDefined()
  //Checking if meters are turned to km
  expect(screen.getByText('Average duration of a trip starting from this station: 3.00 min')).toBeDefined()
  expect(screen.getByText('Average duration of a trip ending to this station: 4.00 min')).toBeDefined()
})
