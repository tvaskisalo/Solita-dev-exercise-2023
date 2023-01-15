import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter as Router } from 'react-router-dom'
import StationsView from '../components/view-stations/StationsView'

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

test('With no name filter all stations are shown', () => {
  render(<Router><StationsView stations={stations}/></Router>)
  expect(screen.getByText('Kallio')).toBeDefined()
  expect(screen.getByText('1')).toBeDefined()
  expect(screen.getByText('Oulunkylän asema')).toBeDefined()
  expect(screen.getByText('2')).toBeDefined()
})

test('Name filter filters stations', async () => {
  const { container } = render(<Router><StationsView stations={stations}/></Router>)
  const user = userEvent.setup()
  const filterField = container.querySelector('#stationNameFilter')
  await user.type(filterField, 'Kall')
  expect(screen.getByText('Kallio')).toBeDefined()
  expect(screen.getByText('1')).toBeDefined()
  expect(() => screen.getByText('Oulunkylän asema')).toThrow()
})

test('Emptying filter will show all staions again', async () => {
  const { container } = render(<Router><StationsView stations={stations}/></Router>)
  const user = userEvent.setup()
  const filterField = container.querySelector('#stationNameFilter')
  await user.type(filterField, 'Kall')
  await user.clear(filterField)
  expect(screen.getByText('Kallio')).toBeDefined()
  expect(screen.getByText('1')).toBeDefined()
  expect(screen.getByText('Oulunkylän asema')).toBeDefined()
  expect(screen.getByText('2')).toBeDefined()
})



