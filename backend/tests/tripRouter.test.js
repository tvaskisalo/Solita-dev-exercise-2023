const Trip = require('../models/trip')
const Station = require('../models/station')
const app = require('../app')
const supertest = require('supertest')
const mongoose = require('mongoose')

const api = supertest(app)

describe('trip post /api/trip', () => {
  beforeEach(async () => {
    await Trip.deleteMany()
    await Station.deleteMany()
  })
  test('Valid trip is added, when stations dont exist', async () => {
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 2,
      distance: 2043,
      duration:500
    }
    await api
      .post('/api/trip')
      .send(trip)
      .expect(201)
    const station1 = await Station.find({ name: 'Käpylän asema', station_id: 1 })
    const station2 = await Station.find({ name: 'Oulunkylän asema', station_id: 2 })
    expect(station1).not.toBe(null)
    expect(station2).not.toBe(null)
    const trips = await Trip.find()
    expect(trips.length).toBe(1)
    expect(trips[0].departure_time).toEqual(trip.departure_time)
    expect(trips[0].return_time).toEqual(trip.return_time)
    expect(trips[0].distance).toBe(trip.distance)
    expect(trips[0].duration).toEqual(trip.duration)
  })
  test('A trip with the same departure and return station can be added', async () => {
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: 'Käpylän asema',
      return_station_id: 1,
      distance: 2043,
      duration:500
    }
    await api
      .post('/api/trip')
      .send(trip)
      .expect(201)
    const station1 = await Station.find({ name: 'Käpylän asema', station_id: 1 })
    expect(station1).not.toBe(null)
    const trips = await Trip.find()
    expect(trips.length).toBe(1)
    expect(trips[0].departure_time).toEqual(trip.departure_time)
    expect(trips[0].return_time).toEqual(trip.return_time)
    expect(trips[0].distance).toBe(trip.distance)
    expect(trips[0].duration).toEqual(trip.duration)
  })
  test('Valid trip is added, when stations are correct and exist', async () => {
    await new Station({ name: 'Käpylän asema', station_id: 1 }).save()
    await new Station({ name: 'Oulunkylän asema', station_id: 2 }).save()
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 2,
      distance: 2043,
      duration:500
    }
    await api
      .post('/api/trip')
      .send(trip)
      .expect(201)
    const trips = await Trip.find()
    expect(trips.length).toBe(1)
    expect(trips[0].departure_time).toEqual(trip.departure_time)
    expect(trips[0].return_time).toEqual(trip.return_time)
    expect(trips[0].distance).toBe(trip.distance)
    expect(trips[0].duration).toEqual(trip.duration)
  })

  test('Valid trip addition returns correct json', async () => {
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 2,
      distance: 2043,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(res.body.departure_time).toEqual(trip.departure_time)
    expect(res.body.return_time).toEqual(trip.return_time)
    expect(res.body.distance).toBe(trip.distance)
    expect(res.body.duration).toEqual(trip.duration)
  })

  test('Validation error is returned when departure station name does not match with db', async () => {
    await new Station({ name: 'Käpylän asema', station_id: 1 }).save()
    await new Station({ name: 'Oulunkylän asema', station_id: 2 }).save()
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Rautatieasema',
      departure_station_id: 1,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 2,
      distance: 2043,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned when departure station id does not match with db', async () => {
    await new Station({ name: 'Käpylän asema', station_id: 1 }).save()
    await new Station({ name: 'Oulunkylän asema', station_id: 2 }).save()
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 3,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 2,
      distance: 2043,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned when return station name does not match with db', async () => {
    await new Station({ name: 'Käpylän asema', station_id: 1 }).save()
    await new Station({ name: 'Oulunkylän asema', station_id: 2 }).save()
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: 'Rautatieasema',
      return_station_id: 2,
      distance: 2043,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned when return station id does not match with db', async () => {
    await new Station({ name: 'Käpylän asema', station_id: 1 }).save()
    await new Station({ name: 'Oulunkylän asema', station_id: 2 }).save()
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 3,
      distance: 2043,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })

  test('Validation error is returned with undefined departure_time', async () => {
    const trip = {
      departure_time: undefined,
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 2,
      distance: 2043,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned with undefined return_time', async () => {
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: undefined,
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 2,
      distance: 2043,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned with undefined departure_station_name', async () => {
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: undefined,
      departure_station_id: 1,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 2,
      distance: 2043,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned with undefined departure_station_id', async () => {
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: undefined,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 2,
      distance: 2043,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned with undefined return_station_name', async () => {
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: undefined,
      return_station_id: 2,
      distance: 2043,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned with undefined return_station_id', async () => {
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: 'Oulunkylän asema',
      return_station_id: undefined,
      distance: 2043,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned with undefined distance', async () => {
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 2,
      distance: undefined,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned with undefined duration', async () => {
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 2,
      distance: 2043,
      duration: undefined
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned with invalid departure_time', async () => {
    const trip = {
      departure_time: 'invalid',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 2,
      distance: 2043,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned with invalid return_time', async () => {
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: 'invalid',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 2,
      distance: 2043,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned with invalid departure_station_name', async () => {
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: '',
      departure_station_id: 1,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 2,
      distance: 2043,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned with invalid departure_station_id', async () => {
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 'invalid',
      return_station_name: 'Oulunkylän asema',
      return_station_id: 2,
      distance: 2043,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned with invalid return_station_name', async () => {
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: '',
      return_station_id: 2,
      distance: 2043,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned with invalid return_station_id', async () => {
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 'invalid',
      distance: 2043,
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned with invalid distance', async () => {
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 2,
      distance: 'invalid',
      duration:500
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
  test('Validation error is returned with invalid duration', async () => {
    const trip = {
      departure_time: '2021-05-31T23:57:25',
      return_time: '2021-06-01T00:05:46',
      departure_station_name: 'Käpylän asema',
      departure_station_id: 1,
      return_station_name: 'Oulunkylän asema',
      return_station_id: 2,
      distance: 2043,
      duration: 'invalid'
    }
    const res = await api
      .post('/api/trip')
      .send(trip)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
    const trips = await Trip.find()
    expect(trips.length).toBe(0)
  })
})

describe('trip get /api/trip', () => {
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
      distance: 1400,
      duration: 366
    }).save()
  })

  test('Correct trips are returned as json', async () => {
    await api
      .get('/api/trip')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('Status 404 is returned when no stations are found', async () => {
    await api
      .get('/api/trip?duration=9999999')
      .expect(404)
  })

  test('Querying departure_time returns correct trips', async () => {
    const res = await api
      .get('/api/trip?departure_time=2021-05-31T23:56:11')
      .expect(200)
    const body = res.body
    expect(body.length).toEqual(1)
    expect(body[0].departure_time).toEqual('2021-05-31T23:56:11')
    expect(body[0].return_time).toEqual('2021-06-01T00:02:02')
    expect(body[0].distance).toEqual(1400)
    expect(body[0].duration).toEqual(350)
  })

  test('Querying return_time returns correct trips', async () => {
    const res = await api
      .get('/api/trip?return_time=2021-06-01T00:00:57')
      .expect(200)
    const body = res.body
    expect(body.length).toEqual(1)
    expect(body[0].departure_time).toEqual('2021-05-31T23:54:48')
    expect(body[0].return_time).toEqual('2021-06-01T00:00:57')
    expect(body[0].distance).toEqual(1400)
    expect(body[0].duration).toEqual(366)
  })

  test('Querying departure_station_name returns correct trips', async () => {
    const res = await api
      .get('/api/trip?departure_station_name=Käpylän asema')
      .expect(200)
    const body = res.body
    expect(body.length).toEqual(5)
    expect(body[0].departure_station.name).toEqual('Käpylän asema')
    expect(body[1].departure_station.name).toEqual('Käpylän asema')
    expect(body[2].departure_station.name).toEqual('Käpylän asema')
    expect(body[3].departure_station.name).toEqual('Käpylän asema')
    expect(body[4].departure_station.name).toEqual('Käpylän asema')
  })

  test('Querying return_station_name returns correct trips', async () => {
    const res = await api
      .get('/api/trip?return_station_name=Käpylän asema')
      .expect(200)
    const body = res.body
    expect(body.length).toEqual(1)
    expect(body[0].return_station.name).toEqual('Käpylän asema')
  })

  test('Querying distance returns correct trips', async () => {
    const res = await api
      .get('/api/trip?distance=1400')
      .expect(200)
    const body = res.body
    expect(body.length).toEqual(2)
    expect(body[0].distance).toEqual(1400)
    expect(body[1].distance).toEqual(1400)
    expect([350, 366]).toContain(body[0].duration)
    expect([350, 366]).toContain(body[1].duration)
  })

  test('Querying duration returns correct trips', async () => {
    const res = await api
      .get('/api/trip?duration=500')
      .expect(200)
    const body = res.body
    expect(body.length).toEqual(1)
    expect(body[0].departure_time).toEqual('2021-05-31T23:57:25'),
    expect(body[0].return_time).toEqual('2021-06-01T00:05:46'),
    expect(body[0].distance).toEqual(2043),
    expect(body[0].duration).toEqual(500)
  })

  //Let us make the naive assumption that if we can query these two fields we can query all combinations.
  //testing them all would take a lot of time
  test('Querying duration and distance returns correct trips', async () => {

  })
  test('Querying with nothing returns all trips', async () => {

  })
})

afterAll(() => {
  mongoose.connection.close()
})
