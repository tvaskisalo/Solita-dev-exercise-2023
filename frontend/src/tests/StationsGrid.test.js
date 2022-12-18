import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import StationsGrid from '../components/StationsGrid'

const stations = [
  {
    name: 'Kallio',
    station_id: 1,
    //This id would be the mongoDB id. It needs to be defined for the grid.
    id: 101
  },
  {
    name: 'Oulunkylän asema',
    station_id: 2,
    //This id would be the mongoDB id. It needs to be defined for the grid.
    id: 201
  }
]

test('StationsGrid shows all stations name and id', () => {
  render(<Router><StationsGrid stations={stations}/></Router>)
  expect(screen.getByText('Station name')).toBeDefined()
  expect(screen.getByText('Station id')).toBeDefined()
  expect(screen.getByText('Kallio')).toBeDefined()
  expect(screen.getByText('1')).toBeDefined()
  expect(screen.getByText('Oulunkylän asema')).toBeDefined()
  expect(screen.getByText('2')).toBeDefined()
})

//This test fails with stations that have ä, ö or å in it.
test('Clicking on stations redirects to /stations/:name', async () => {
  render(<Router><StationsGrid stations={stations}/></Router>)
  const user = userEvent.setup()
  const station = screen.getByText('Kallio')
  await user.click(station)
  expect(window.location.href).toContain('/stations/Kallio')
})


test('StationsGrid only shows first 50 on the first page', () => {
  const many_stations = [
    { name: 'a', id: 1, station_id: 1 },
    { name: 'a', id: 2, station_id: 1 },
    { name: 'a', id: 3, station_id: 1 },
    { name: 'a', id: 4, station_id: 1 },
    { name: 'a', id: 5, station_id: 1 },
    { name: 'a', id: 6, station_id: 1 },
    { name: 'a', id: 7, station_id: 1 },
    { name: 'a', id: 8, station_id: 1 },
    { name: 'a', id: 9, station_id: 1 },
    { name: 'a', id: 10, station_id: 1 },
    { name: 'a', id: 11, station_id: 1 },
    { name: 'a', id: 12, station_id: 1 },
    { name: 'a', id: 13, station_id: 1 },
    { name: 'a', id: 14, station_id: 1 },
    { name: 'a', id: 15, station_id: 1 },
    { name: 'a', id: 16, station_id: 1 },
    { name: 'a', id: 17, station_id: 1 },
    { name: 'a', id: 18, station_id: 1 },
    { name: 'a', id: 19, station_id: 1 },
    { name: 'a', id: 20, station_id: 1 },
    { name: 'a', id: 21, station_id: 1 },
    { name: 'a', id: 22, station_id: 1 },
    { name: 'a', id: 23, station_id: 1 },
    { name: 'a', id: 24, station_id: 1 },
    { name: 'a', id: 25, station_id: 1 },
    { name: 'a', id: 26, station_id: 1 },
    { name: 'a', id: 27, station_id: 1 },
    { name: 'a', id: 28, station_id: 1 },
    { name: 'a', id: 29, station_id: 1 },
    { name: 'a', id: 30, station_id: 1 },
    { name: 'a', id: 31, station_id: 1 },
    { name: 'a', id: 32, station_id: 1 },
    { name: 'a', id: 33, station_id: 1 },
    { name: 'a', id: 34, station_id: 1 },
    { name: 'a', id: 35, station_id: 1 },
    { name: 'a', id: 36, station_id: 1 },
    { name: 'a', id: 37, station_id: 1 },
    { name: 'a', id: 38, station_id: 1 },
    { name: 'a', id: 39, station_id: 1 },
    { name: 'a', id: 40, station_id: 1 },
    { name: 'a', id: 41, station_id: 1 },
    { name: 'a', id: 42, station_id: 1 },
    { name: 'a', id: 43, station_id: 1 },
    { name: 'a', id: 44, station_id: 1 },
    { name: 'a', id: 45, station_id: 1 },
    { name: 'a', id: 46, station_id: 1 },
    { name: 'a', id: 47, station_id: 1 },
    { name: 'a', id: 48, station_id: 1 },
    { name: 'a', id: 49, station_id: 1 },
    { name: 'a', id: 50, station_id: 1 },
    { name: 'test station', id: 51, station_id: 1 },
  ]
  render(<Router><StationsGrid stations={many_stations}/></Router>)
  expect(() => screen.getByText('test station')).toThrow()
})
