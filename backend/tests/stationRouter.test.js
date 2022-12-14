const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Station = require('../models/station')

const api = supertest(app)

describe('station post /api/station/', () => {
  beforeEach(async() => {
    await Station.deleteMany()
  }, 2000)

  test('Valid station can be added', async () => {
    const station = {
      name: 'Käpylän asema',
      station_id: 1
    }
    await api
      .post('/api/station')
      .send(station)
      .expect(201)

    const stations = await Station.find()
    expect(stations.length).toBe(1)
    expect(stations[0].name).toEqual(station.name)
    expect(stations[0].station_id).toEqual(station.station_id)
  })

  test('Valid station additon returns correct json', async () => {
    const station = {
      name: 'Käpylän asema',
      station_id: 1
    }
    const returned_station = await api
      .post('/api/station')
      .send(station)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    expect(returned_station.body.name).toEqual(station.name)
    expect(returned_station.body.station_id).toEqual(station.station_id)
  })

  test('Validation error is returned with undefined body', async () => {
    const station = {}
    const res = await api
      .post('/api/station')
      .send(station)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
  })

  test('Validation error is returned with invalid body', async () => {
    const station = {
      name: '',
      station_id: 'id'
    }
    const res = await api
      .post('/api/station')
      .send(station)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
  })

  test('Validation error is returned with undefined name', async () => {
    const station = {
      name: undefined,
      station_id: 1
    }
    const res = await api
      .post('/api/station')
      .send(station)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
  })

  test('Validation error is returned with invalid name', async () => {
    const station = {
      name: '',
      station_id: 1
    }
    const res = await api
      .post('/api/station')
      .send(station)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
  })

  test('Validation error is returned with undefined station_id', async () => {
    const station = {
      name: 'Käpylän asema',
      station_id: undefined
    }
    const res = await api
      .post('/api/station')
      .send(station)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
  })

  test('Validation error is returned with invalid station_id', async () => {
    const station = {
      name: 'Käpylän asema',
      station_id: 'id'
    }
    const res = await api
      .post('/api/station')
      .send(station)
      .expect(400)
    expect(res.error.text).toMatch('ValidationError')
    const stations = await Station.find()
    expect(stations.length).toBe(0)
  })
})

describe('station get /api/station/:name', () => {
  beforeEach(async() => {
    await Station.deleteMany()
  })
  test('Correct station is returned as json', async () => {
    const station = await new Station({ name: 'Käpylän asema', station_id: 1 }).save()
    const res = await api
      .get('/api/station/Käpylän asema')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(res.body.name).toEqual(station.name)
    expect(res.body.station_id).toEqual(station.station_id)
  })

  test('Status 404 is returned when no station is found', async () => {
    await api
      .get('/api/station/test')
      .expect(404)
  })
})

describe('station get /api/station', () => {
  beforeEach(async () => {
    await Station.deleteMany()
  })
  test('Stations are returned as json', async () => {
    const station1 = await new Station({ name: 'Käpylän asema', station_id: 1 }).save()
    const station2 = await new Station({ name: 'Oulunkylän asema', station_id: 2 }).save()

    const res = await api
      .get('/api/station')
      .expect(200)
      .expect('Content-Type', /application\/json/)
    expect(res.body.length).toEqual(2)
    expect([station1.name, station2.name]).toContain(res.body[0].name)
    expect([station1.name, station2.name]).toContain(res.body[1].name)
    expect([station1.station_id, station2.station_id]).toContain(res.body[0].station_id)
    expect([station1.station_id, station2.station_id]).toContain(res.body[1].station_id)
  })

  test('Status 404 is returned when no stations are found', async () => {
    await api
      .get('/api/station')
      .expect(404)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
