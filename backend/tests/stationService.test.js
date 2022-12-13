const stationService = require('../services/stationService')
const Station = require('../models/station')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config')

beforeAll(async() => {
  try {
    mongoose.connect(MONGODB_URI)
  } catch (e) {
    console.log('Failed to connect to mongodb')
  }
}, 2000)

describe('Station addition', () => {
  beforeEach(async() => {
    await Station.deleteMany()
  }, 3000)

  test('Valid station can be added', async () => {
    await stationService.addStation('Käpylän asema', 1)
    const stations = await Station.find({})
    expect(stations.length).toBe(1)
    expect(stations[0].name).toBe('Käpylän asema')
    expect(stations[0].station_id).toBe(1)
  }, 2000)

  test('Correct station is returned', async () => {
    const station = await stationService.addStation('Käpylän asema', 1)
    expect(station.name).toBe('Käpylän asema')
    expect(station.station_id).toBe(1)
  }, 2000)

  test('Station name must be unique', async () => {
    await stationService.addStation('Käpylän asema', 1);
    () => { expect(async () => await stationService.addStation('Käpylän asema', 2)).toThrow() }
    const stations = await Station.find()
    expect(stations.length).toBe(1)
    expect(stations[0].station_id).toBe(1)
  }, 2000)

  test('Station id must be unique', async () => {
    await stationService.addStation('Käpylän asema', 1);
    () => { expect(async () => await stationService.addStation('Oulunkylän asema', 1)).toThrow() }
    const stations = await Station.find()
    expect(stations.length).toBe(1)
    expect(stations[0].name).toBe('Käpylän asema')
  }, 2000)

  test('Station with undefined name is not added', async () => {
    () => expect(async () => await stationService.addStation(undefined, 1)).toThrow()
    const stations = await Station.find({})
    expect(stations).toEqual([])
  }, 2000)

  test('Station with empty name is not added', async () => {
    () => expect(async () => await stationService.addStation('', 1)).toThrow()
    const stations = await Station.find({})
    expect(stations).toEqual([])
  }, 2000)

  test('Station with undefined id is not added', async () => {
    () => expect(async () => await stationService.addStation('Käpylän asema', undefined)).toThrow()
    const stations = await Station.find({})
    expect(stations).toEqual([])
  }, 2000)

  test('Station with non-number id is not added', async () => {
    () => expect(async () => await stationService.addStation('Käpylän asema', 'asema')).toThrow()
    const stations = await Station.find({})
    expect(stations).toEqual([])
  }, 2000)

  test('Station with float-number id is not added', async () => {
    () => expect(async () => await stationService.addStation('Käpylän asema', 10.1)).toThrow()
    const stations = await Station.find({})
    expect(stations).toEqual([])
  }, 2000)

  test('Station with negative id is not added', async () => {
    () => expect(async () => await stationService.addStation('Käpylän asema', -1)).toThrow()
    const stations = await Station.find({})
    expect(stations).toEqual([])
  }, 2000)
})

describe('Station getters', () => {
  beforeEach(async () => {
    await Station.deleteMany()
    await new Station({ station_id: 1, name: 'Käpylän asema' }).save()
    await new Station({ station_id: 2, name: 'Oulunkylän asema' }).save()
  }, 3000)

  test('getStationById returns correct station with valid id', async() => {
    const station = await stationService.getStationById('1')
    expect(station.station_id).toBe(1)
    expect(station.name).toBe('Käpylän asema')
  }, 2000)

  test('getStationById throws error with invalid id', async () => {
    () => expect(async () => await stationService.getStationById('id')).toThrow()
  }, 2000)

  test('getStationById throws error with undefined id', async () => {
    () => expect(async () => await stationService.getStationById(undefined)).toThrow()
  }, 2000)

  test('getStationByName returns correct station with valid name', async() => {
    const station = await stationService.getStationByName('Käpylän asema')
    expect(station.station_id).toBe(1)
    expect(station.name).toBe('Käpylän asema')
  }, 2000)

  test('getStationByName throws error with empty string', async () => {
    () => expect(async () => await stationService.getStationByName('')).toThrow()
  }, 2000)

  test('getStationByName throws error with undefined name', async () => {
    () => expect(async () => await stationService.getStationByName(undefined)).toThrow()
  }, 2000)


  test('getStations returns all stations', async () => {
    const stations = await stationService.getStations()
    expect(stations.length).toBe(2)
    expect(stations[0].station_id).toBe(1)
    expect(stations[0].name).toBe('Käpylän asema')
    expect(stations[1].station_id).toBe(2)
    expect(stations[1].name).toBe('Oulunkylän asema')
  }, 2000)
})
