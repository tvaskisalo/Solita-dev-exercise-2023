import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import StationForm from '../components/add-station/StationForm'
import userEvent from '@testing-library/user-event'

describe('Form is rendered correctly', () => {
  test('Station name input is rendered correctly', () => {
    const result = render(<StationForm addStation={() => null}/>)
    const element = result.container.querySelector('#StationNameInput')
    expect(element).toBeDefined()
  })
  test('Station id input is rendered correctly', () => {
    const result = render(<StationForm addStation={() => null}/>)
    const element = result.container.querySelector('#StationIdInput')
    expect(element).toBeDefined()
  })
  test('Submit button is rendered correctly', () => {
    const result = render(<StationForm addStation={() => null}/>)
    const element = result.container.querySelector('#StationSubmitButton')
    expect(element).toBeDefined()
  })
})

describe('Submiting form calls function correctly', () => {
  test('Form calls the given function', async () => {
    const addStation = jest.fn()
    const user = userEvent.setup()
    const result = render(<StationForm addStation={ addStation } />)
    const button = result.container.querySelector('#StationSubmitButton')
    await user.click(button)
    expect(addStation.mock.calls).toHaveLength(1)
  })
  test('Function gets correct data', async () => {
    const addStation = jest.fn()
    const user = userEvent.setup()
    const result = render(<StationForm addStation={ addStation }/>)

    const stationNameInput = result.container.querySelector('#StationNameInput')
    await user.type(stationNameInput, 'testStationName')

    const stationIdInput = result.container.querySelector('#StationIdInput')
    await user.type(stationIdInput, '1')

    const button = result.container.querySelector('#StationSubmitButton')
    await user.click(button)

    expect(addStation.mock.calls).toHaveLength(1)
    expect(addStation.mock.calls[0][0]).toBe('testStationName')
    expect(addStation.mock.calls[0][1]).toBe('1')
  })
})
