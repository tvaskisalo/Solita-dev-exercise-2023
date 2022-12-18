const Trip = require('../models/trip')
const Station = require('../models/station')
const tripService = require('../services/tripService')
const mongoose = require('mongoose')
const { MONGODB_URI } = require('../utils/config')

beforeAll(() => {
  mongoose.connect(MONGODB_URI)
}, 2000)


describe('Trip addition', () => {
  beforeEach(async () => {
    await Trip.deleteMany()
    await Station.deleteMany()
    await new Station({ name: 'Käpylän asema', station_id: 1 }).save()
    await new Station({ name: 'Oulunkylän asema', station_id: 2 }).save()
  })

  test('addTrip adds trip with valid data', async () => {
    const departure_station = await Station.findOne({ name: 'Käpylän asema' })
    const return_station = await Station.findOne({ name: 'Oulunkylän asema' })
    const trip = await tripService.addTrip('2021-05-31T23:57:25', '2021-06-01T00:05:46', departure_station, return_station, 2043, 500)
    expect(trip).not.toBe(null)
    expect(trip.departure_time).toEqual('2021-05-31T23:57:25')
    expect(trip.return_time).toEqual('2021-06-01T00:05:46')
    expect(trip.departure_station).toEqual(departure_station._id)
    expect(trip.return_station).toEqual(return_station._id)
    expect(trip.distance).toEqual(2043)
    expect(trip.duration).toEqual(500)
  })

  test('addTrip throws error with invalid departure_time', async () => {
    const departure_station = await Station.findOne({ name: 'Käpylän asema' })
    const return_station = await Station.findOne({ name: 'Oulunkylän asema' });
    () => expect(async() => await tripService.addTrip('', '2021-06-01T00:05:46', departure_station, return_station, 2043, 500)).toThrow()
  })

  test('addTrip does not add trip with invalid departure_time', async () => {
    const departure_station = await Station.findOne({ name: 'Käpylän asema' })
    const return_station = await Station.findOne({ name: 'Oulunkylän asema' })
    try {
      await tripService.addTrip('', '2021-06-01T00:05:46', departure_station, return_station, 2043, 500)
    } catch (e) {
      () => undefined
    }
    const trips = await Trip.find()
    expect(trips.length).toEqual(0)
  })

  test('addTrip throws error with invalid return_time', async () => {
    const departure_station = await Station.findOne({ name: 'Käpylän asema' })
    const return_station = await Station.findOne({ name: 'Oulunkylän asema' });
    () => expect(async() => await tripService.addTrip('2021-05-31T23:57:25', '', departure_station, return_station, 2043, 500)).toThrow()
  })

  test('addTrip does not add trip with invalid return_time', async () => {
    const departure_station = await Station.findOne({ name: 'Käpylän asema' })
    const return_station = await Station.findOne({ name: 'Oulunkylän asema' })
    try {
      await tripService.addTrip('2021-05-31T23:57:25', '', departure_station, return_station, 2043, 500)
    } catch (e) {
      () => undefined
    }
    const trips = await Trip.find()
    expect(trips.length).toEqual(0)
  })

  test('addTrip throws error with invalid distance', async () => {
    const departure_station = await Station.findOne({ name: 'Käpylän asema' })
    const return_station = await Station.findOne({ name: 'Oulunkylän asema' });
    () => expect(async() => await tripService.addTrip('2021-05-31T23:57:25', '2021-06-01T00:05:46', departure_station, return_station, 'distance', 500)).toThrow()
  })

  test('addTrip does not add trip with invalid distance', async () => {
    const departure_station = await Station.findOne({ name: 'Käpylän asema' })
    const return_station = await Station.findOne({ name: 'Oulunkylän asema' })
    try {
      await tripService.addTrip('2021-05-31T23:57:25', '2021-06-01T00:05:46', departure_station, return_station, 'distance', 500)
    } catch (e) {
      () => undefined
    }
    const trips = await Trip.find()
    expect(trips.length).toEqual(0)
  })

  test('addTrip throws error with invalid duration', async () => {
    const departure_station = await Station.findOne({ name: 'Käpylän asema' })
    const return_station = await Station.findOne({ name: 'Oulunkylän asema' });
    () => expect(async() => await tripService.addTrip('2021-05-31T23:57:25', '2021-06-01T00:05:46', departure_station, return_station, 2043, 'duration')).toThrow()
  })

  test('addTrip does not add trip with invalid duration', async () => {
    const departure_station = await Station.findOne({ name: 'Käpylän asema' })
    const return_station = await Station.findOne({ name: 'Oulunkylän asema' })
    try {
      await tripService.addTrip('2021-05-31T23:57:25', '2021-06-01T00:05:46', departure_station, return_station, 2043, 'duration')
    } catch (e) {
      () => undefined
    }
    const trips = await Trip.find()
    expect(trips.length).toEqual(0)
  })
})

describe('Trip getters', () => {
  beforeEach(async () => {
    await Trip.deleteMany()
    await Station.deleteMany()
    const s1 = await new Station({ name: 'Käpylän asema', station_id: 1 }).save()
    const s2 = await new Station({ name: 'Oulunkylän asema', station_id: 2 }).save()
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
      return_station: s2._id,
      distance: 1025,
      duration: 399
    }).save()
    await new Trip({
      departure_time: '2021-05-31T23:56:23',
      return_time: '2021-06-01T00:29:58',
      departure_station: s1._id,
      return_station: s2._id,
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
      departure_station: s1._id,
      return_station: s2._id,
      distance: 1712,
      duration: 366
    }).save()
  })

  test('getTripById returns correct trip', async () => {
    const trip = await Trip.findOne({ distance: 1712 })
    const result = await tripService.getTripById(trip.id)
    expect(result.id).toEqual(trip.id)
  })

  test('getTripById throws error with undefined id', async() => {
    () => expect(async () => await tripService.getTripById(undefined)).toThrow()
  })
  test('getTrips returns correct trips with departure_time', async () => {
    const trips = await tripService.getTrips('2021-05-31T23:57:25', undefined, undefined, undefined, undefined, undefined)
    expect(trips.length).toBe(1)
    expect(trips[0].departure_time).toEqual('2021-05-31T23:57:25')
    expect(trips[0].return_time).toEqual('2021-06-01T00:05:46')
    expect(trips[0].distance).toEqual(2043)
    expect(trips[0].duration).toEqual(500)
  })

  test('getTrips returns correct trip with return_time', async () => {
    const trips = await tripService.getTrips(undefined,'2021-06-01T00:02:02', undefined, undefined, undefined, undefined)
    expect(trips.length).toBe(1)
    expect(trips[0].departure_time).toEqual('2021-05-31T23:56:11')
    expect(trips[0].return_time).toEqual('2021-06-01T00:02:02')
    expect(trips[0].distance).toEqual(1400)
    expect(trips[0].duration).toEqual(350)
  })

  test('getTrips returns correct trips with departure_station_name', async () => {
    const trips = await tripService.getTrips(undefined, undefined, 'Käpylän asema', undefined, undefined, undefined)
    expect(trips.length).toBe(5)
  })

  test('getTrips returns correct trips with return_station_name', async () => {
    const trips = await tripService.getTrips(undefined, undefined, undefined, 'Käpylän asema', undefined, undefined)
    expect(trips.length).toBe(1)
    expect(trips[0].distance).toEqual(1400)
    expect(trips[0].duration).toEqual(350)
  })

  test('getTrips returns correct trip with distance', async () => {
    const trips = await tripService.getTrips(undefined, undefined, undefined, undefined, 4318, undefined)
    expect(trips.length).toBe(1)
    expect(trips[0].departure_time).toEqual('2021-05-31T23:56:23')
    expect(trips[0].return_time).toEqual('2021-06-01T00:29:58')
    expect(trips[0].distance).toEqual(4318)
    expect(trips[0].duration).toEqual(2009)
  })

  test('getTrips returns correct trip with duration', async () => {
    const trips = await tripService.getTrips(undefined, undefined, undefined, undefined, undefined, 366)
    expect(trips.length).toBe(1)
    expect(trips[0].departure_time).toEqual('2021-05-31T23:54:48')
    expect(trips[0].return_time).toEqual('2021-06-01T00:00:57')
    expect(trips[0].distance).toEqual(1712)
    expect(trips[0].duration).toEqual(366)
  })

  test('getTrips returns all trips with no arguments', async () => {
    const trips = await tripService.getTrips(undefined, undefined, undefined, undefined, undefined, undefined)
    expect(trips.length).toEqual(6)
  })

  test('getTrips returns correct trip when all fields are defined correctly', async () => {
    const trip = await tripService.getTrips('2021-05-31T23:54:48', '2021-06-01T00:00:57', 'Käpylän asema', 'Oulunkylän asema', 1712, 366)
    expect(trip.length).toEqual(1)
    expect(trip[0].departure_time).toEqual('2021-05-31T23:54:48')
    expect(trip[0].return_time).toEqual('2021-06-01T00:00:57')
    expect(trip[0].distance).toEqual(1712)
    expect(trip[0].duration).toEqual(366)
  })

  test('getTrips returns nothing when trip is not in database', async () => {
    const trip = await tripService.getTrips('2021-05-31T23:54:48', '2021-06-01T00:00:57', 'Käpylän asema', 'Oulunkylän asema', 17, 366)
    expect(trip.length).toEqual(0)
  })
})
afterAll(() => {
  mongoose.connection.close()
})
