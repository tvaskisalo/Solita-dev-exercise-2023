const parsers = require('../utils/parsers')

describe('Datapoint parser tests', () => {
  test('parseDatapoint returns correct data', () => {
    const datapoint = parsers.parseDatapoint('2021-05-31T23:57:25,2021-06-01T00:05:46,094,Laajalahden aukio,100,Teljäntie,2043,500')
    expect(datapoint.departure_time).toBeDefined()
    expect(datapoint.return_time).toBeDefined()
    expect(datapoint.departure_station_id).toBeDefined()
    expect(datapoint.departure_station_name).toBeDefined()
    expect(datapoint.return_station_id).toBeDefined()
    expect(datapoint.return_station_name).toBeDefined()
    expect(datapoint.distance).toBeDefined()
    expect(datapoint.duration).toBeDefined()

    expect(typeof datapoint.departure_time).toBe('string')
    expect(typeof datapoint.return_time).toBe('string')
    expect(typeof datapoint.departure_station_id).toBe('number')
    expect(typeof datapoint.departure_station_name).toBe('string')
    expect(typeof datapoint.return_station_id).toBe('number')
    expect(typeof datapoint.return_station_name).toBe('string')
    expect(typeof datapoint.distance).toBe('number')
    expect(typeof datapoint.duration).toBe('number')
  })
})

describe('csvParser tests', () => {
  test('csvParser returns correct array with file containing only valid data', async() => {
    const data = await parsers.csvParser('./tests/valid_data.csv')
    expect(data).toBeDefined()
    expect(data.length).toBe(15)
    const sample = data[0]
    expect(sample).toEqual({
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_id: 94,
      departure_station_name: 'Laajalahden aukio',
      return_station_id: 100,
      return_station_name: 'Teljäntie',
      distance: 2043,
      duration: 500
    })
  })

  test('csvParser throws error with undefined filename', () => {
    () => expect(() => parsers.csvParser(undefined)).toThrow('Missing or invalid filename')
  })

  test('csvParser throws error with empty filename', () => {
    () => expect(() => parsers.csvParser('')).toThrow('Missing or invalid filename')
  })

  test('csvParser returns empty array with file containing only incorrect data', async() => {
    const data = await parsers.csvParser('./tests/invalid_data.csv')
    expect(data.length).toBe(0)
  })
})
