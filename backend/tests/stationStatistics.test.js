//This test set is for testing the single station's statistics.
const stationService = require('../services/stationService')
const Station = require('../models/station')
const Trip = require('../models/trip')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config')

beforeAll(() => {
  mongoose.connect(MONGODB_URI)
}, 5000)

describe('Station statistics', () => {
  beforeEach(async() => {
    await Trip.deleteMany()
    await Station.deleteMany()
    const s1 = await new Station({ name: 'Käpylän asema', station_id: 1 }).save()
    const s2 = await new Station({ name: 'Oulunkylän asema', station_id: 2 }).save()
    const s3 = await new Station({ name: 'Kallio', station_id: 3 }).save()
    await new Trip({
      departure_time: '2021-05-31T23:57:25' ,
      return_time: '2021-06-01T00:05:46',
      departure_station: s1._id,
      return_station: s2._id,
      distance: 2043,
      duration: 500
    }).save()
    await new Trip({
      departure_time: '2021-05-31T23:56:59',
      return_time: '2021-06-01T00:07:14',
      departure_station: s1._id,
      return_station: s2._id,
      distance: 1870,
      duration: 611
    }).save()
    await new Trip({
      departure_time: '2021-05-31T23:56:44',
      return_time: '2021-06-01T00:03:26',
      departure_station: s1._id,
      return_station: s1._id,
      distance: 1025,
      duration: 399
    }).save()
    await new Trip({
      departure_time: '2021-05-31T23:56:23',
      return_time: '2021-06-01T00:29:58',
      departure_station: s2._id,
      return_station: s1._id,
      distance: 4318,
      duration: 2009
    }).save()
    await new Trip({
      departure_time: '2021-05-31T23:56:11',
      return_time: '2021-06-01T00:02:02',
      departure_station: s2._id,
      return_station: s1._id,
      distance: 1400,
      duration: 350
    }).save()
    await new Trip({
      departure_time: '2021-05-31T23:54:48',
      return_time: '2021-06-01T00:00:57',
      departure_station: s3._id,
      return_station: s1._id,
      distance: 1712,
      duration: 366
    }).save()
  })

  test('Trips count starting from the station is correct', async () => {
    const s1 = await stationService.getStation('Käpylän asema', undefined)
    const s2 = await stationService.getStation('Oulunkylän asema', undefined)
    const s3 = await stationService.getStation('Kallio', undefined)

    expect(s1).toBeDefined()
    expect(s1.trips_starting).toEqual(3)

    expect(s2).toBeDefined()
    expect(s2.trips_starting).toEqual(2)

    expect(s3).toBeDefined()
    expect(s3.trips_starting).toEqual(1)
  })

  test('Trips count ending to the station is correct', async () => {
    const s1 = await stationService.getStation('Käpylän asema', undefined)
    const s2 = await stationService.getStation('Oulunkylän asema', undefined)
    const s3 = await stationService.getStation('Kallio', undefined)

    expect(s1).toBeDefined()
    expect(s1.trips_ending).toEqual(4)

    expect(s2).toBeDefined()
    expect(s2.trips_ending).toEqual(2)

    expect(s3).toBeDefined()
    expect(s3.trips_ending).toBeUndefined()
  })
  test('Average trip distance ending to the station is correct', async () => {
    const s1 = await stationService.getStation('Käpylän asema', undefined)
    const s2 = await stationService.getStation('Oulunkylän asema', undefined)
    const s3 = await stationService.getStation('Kallio', undefined)

    expect(s1).toBeDefined()
    expect(s1.avg_distance_ending).toEqual(2113.75)

    expect(s2).toBeDefined()
    expect(s2.avg_distance_ending).toEqual(1956.5)

    expect(s3).toBeDefined()
    expect(s3.avg_distance_ending).toBeUndefined()
  })
  test('Average trip distance starting from the station is correct', async () => {
    const s1 = await stationService.getStation('Käpylän asema', undefined)
    const s2 = await stationService.getStation('Oulunkylän asema', undefined)
    const s3 = await stationService.getStation('Kallio', undefined)

    expect(s1).toBeDefined()
    expect(s1.avg_distance_starting).toEqual(1646)

    expect(s2).toBeDefined()
    expect(s2.avg_distance_starting).toEqual(2859)

    expect(s3).toBeDefined()
    expect(s3.avg_distance_starting).toEqual(1712)
  })
  test('Average trip duration ending to the station is correct', async () => {
    const s1 = await stationService.getStation('Käpylän asema', undefined)
    const s2 = await stationService.getStation('Oulunkylän asema', undefined)
    const s3 = await stationService.getStation('Kallio', undefined)

    expect(s1).toBeDefined()
    expect(s1.avg_duration_ending).toEqual(781)

    expect(s2).toBeDefined()
    expect(s2.avg_duration_ending).toEqual(555.5)

    expect(s3).toBeDefined()
    expect(s3.avg_duration_ending).toBeUndefined()
  })
  test('Average trip duration starting from the station is correct', async () => {
    const s1 = await stationService.getStation('Käpylän asema', undefined)
    const s2 = await stationService.getStation('Oulunkylän asema', undefined)
    const s3 = await stationService.getStation('Kallio', undefined)

    expect(s1).toBeDefined()
    expect(s1.avg_duration_starting).toEqual(503.3333333333333)

    expect(s2).toBeDefined()
    expect(s2.avg_duration_starting).toEqual(1179.5)

    expect(s3).toBeDefined()
    expect(s3.avg_duration_starting).toEqual(366)
  })
})
