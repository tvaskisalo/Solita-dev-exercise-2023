const mongoose = require('mongoose')
const Trip = require('../models/trip')
const Station = require('../models/station')
const { import_csv } = require('../utils/csv_importer')
const { MONGODB_URI } = require('../utils/config')

beforeAll(async() => {
  await mongoose.connect(MONGODB_URI)
}, 2000)

beforeEach(async () => {
  await Station.deleteMany()
  await Trip.deleteMany()
}, 2000)

test('Import_csv throws error with undefined path', async () => {
  () => expect(async() => await import_csv(undefined)).toThrow()
})

test('Import_csv throws error with invalid path', async () => {
  () => expect(async() => await import_csv('test')).toThrow()
})

test('Import_csv does not add invalid data', async() => {
  await import_csv('./tests/invalid_data')
  const stations = await Station.find()
  const trips = await Trip.find()
  expect(stations.length).toBe(0)
  expect(trips.length).toBe(0)
})

test('Import_csv adds valid data', async () => {
  await import_csv('./tests/valid_data')
  const stations = await Station.find()
  const trips = await Trip.find()
  expect(stations.length).toBe(22)
  expect(trips.length).toBe(15)
})

afterAll(() => {
  mongoose.connection.close()
})
