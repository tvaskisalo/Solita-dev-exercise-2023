import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Navigationbar from '../components/Navigationbar'
import { BrowserRouter as Router } from 'react-router-dom'

test('Navigationbar has all the correct buttons', () => {
  render(
    <Router><Navigationbar /></Router>
  )
  expect(screen.getByText('View stations')).toBeDefined()
  expect(screen.getByText('View trips')).toBeDefined()
  expect(screen.getByText('Add trip')).toBeDefined()
  expect(screen.getByText('Add station')).toBeDefined()
})
test('Clicking View stations changes url to /stations', async () => {
  render(
    <Router><Navigationbar /></Router>
  )
  const user = userEvent.setup()
  const button = screen.getByText('View stations')
  await user.click(button)
  expect(window.location.href).toContain('/stations')
})
test('Clicking View trips changes url to /trips', async () => {
  render(
    <Router><Navigationbar /></Router>
  )
  const user = userEvent.setup()
  const button = screen.getByText('View trips')
  await user.click(button)
  expect(window.location.href).toContain('/trips')
})
test('Clicking Add station changes url to /addStation', async () => {
  render(
    <Router><Navigationbar /></Router>
  )
  const user = userEvent.setup()
  const button = screen.getByText('Add station')
  await user.click(button)
  expect(window.location.href).toContain('/addStation')
})
test('Clicking Add trip changes url to /addTrip', async () => {
  render(
    <Router><Navigationbar /></Router>
  )
  const user = userEvent.setup()
  const button = screen.getByText('Add trip')
  await user.click(button)
  expect(window.location.href).toContain('/addTrip')
})
