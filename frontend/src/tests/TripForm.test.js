import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import TripForm from '../components/TripForm'
import userEvent from '@testing-library/user-event'

describe('Form is rendered correctly', () => {
  test('Departure time input is rendered correctly', () => {
    const result = render(<TripForm addTrip={() => null}/>)
    const element = result.container.querySelector('#DepartureTimeInput')
    expect(element).toBeDefined()
  })
  test('Return time input is rendered correctly', () => {
    const result = render(<TripForm addTrip={() => null}/>)
    const element = result.container.querySelector('#ReturnTimeInput')
    expect(element).toBeDefined()
  })
  test('Departure station name input is rendered correctly', () => {
    const result = render(<TripForm addTrip={() => null}/>)
    const element = result.container.querySelector('#DepartureNameInput')
    expect(element).toBeDefined()
  })
  test('Departure station id input is rendered correctly', () => {
    const result = render(<TripForm addTrip={() => null}/>)
    const element = result.container.querySelector('#DepartureIdInput')
    expect(element).toBeDefined()
  })
  test('Return station name input is rendered correctly', () => {
    const result = render(<TripForm addTrip={() => null}/>)
    const element = result.container.querySelector('#ReturnNameInput')
    expect(element).toBeDefined()
  })
  test('Return station id input is rendered correctly', () => {
    const result = render(<TripForm addTrip={() => null}/>)
    const element = result.container.querySelector('#ReturnIdInput')
    expect(element).toBeDefined()
  })
  test('Distance input is rendered correctly', () => {
    const result = render(<TripForm addTrip={() => null}/>)
    const element = result.container.querySelector('#DistanceInput')
    expect(element).toBeDefined()
  })
  test('Duration input is rendered correctly', () => {
    const result = render(<TripForm addTrip={() => null}/>)
    const element = result.container.querySelector('#DurtaionInput')
    expect(element).toBeDefined()
  })
  test('Submit button is rendered correctly', () => {
    const result = render(<TripForm addTrip={() => null}/>)
    const element = result.container.querySelector('#TripSubmitButton')
    expect(element).toBeDefined()
  })
})

describe('Submiting form calls function correctly', () => {
  test('Form calls the given function', async () => {
    const addTrip = jest.fn()
    const user = userEvent.setup()
    const result = render(<TripForm addTrip={ addTrip } />)
    const button = result.container.querySelector('#TripSubmitButton')
    await user.click(button)
    expect(addTrip.mock.calls).toHaveLength(1)
  })
  test('Function gets correct data', async () => {
    const addTrip = jest.fn()
    const user = userEvent.setup()
    const result = render(<TripForm addTrip={ addTrip }/>)

    const departureTimeInput = result.container.querySelector('#DepartureTimeInput')
    await user.type(departureTimeInput, 'testDepartureTime')

    const returnTimeInput = result.container.querySelector('#ReturnTimeInput')
    await user.type(returnTimeInput, 'testReturnTime')

    const departureNameInput = result.container.querySelector('#DepartureNameInput')
    await user.type(departureNameInput, 'testDepartureName')

    const departureIdInput = result.container.querySelector('#DepartureIdInput')
    await user.type(departureIdInput, '1')

    const returnNameInput = result.container.querySelector('#ReturnNameInput')
    await user.type(returnNameInput, 'testReturnName')

    const returnIdInput = result.container.querySelector('#ReturnIdInput')
    await user.type(returnIdInput, '2')

    const distanceInput = result.container.querySelector('#DistanceInput')
    await user.type(distanceInput, '11')

    const durationInput = result.container.querySelector('#DurationInput')
    await user.type(durationInput, '20')

    const button = result.container.querySelector('#TripSubmitButton')
    await user.click(button)

    expect(addTrip.mock.calls).toHaveLength(1)
    expect(addTrip.mock.calls[0][0]).toBe('testDepartureTime')
    expect(addTrip.mock.calls[0][1]).toBe('testReturnTime')
    expect(addTrip.mock.calls[0][2]).toBe('testDepartureName')
    expect(addTrip.mock.calls[0][3]).toBe('1')
    expect(addTrip.mock.calls[0][4]).toBe('testReturnName')
    expect(addTrip.mock.calls[0][5]).toBe('2')
    expect(addTrip.mock.calls[0][6]).toBe('11')
    expect(addTrip.mock.calls[0][7]).toBe('20')
  })
})
