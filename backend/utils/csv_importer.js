const fs = require('fs')
const { csvParser } = require('./parsers')
const tripService = require('../services/tripService')
const stationService = require('../services/stationService')


const import_csv = async (path) => {
  if (!path) {
    throw new Error('Path is undefined')
  }
  const files = fs.readdirSync(path)
  for (const file of files ){
    try {
      const dataArray = await csvParser(path+'/'+file)
      for (const data of dataArray){
        try {
          let departure_station = await stationService.getStation(data.departure_station_name, data.departure_station_id)
          if (!departure_station) {
            //No need for try-catch since errors are automatically sent to error-handler
            departure_station = await stationService.addStation(data.departure_station_name, data.departure_station_id)
          }

          let return_station = await stationService.getStation(data.return_station_name, data.return_station_id)
          if (!return_station) {
            //No need for try-catch since errors are automatically sent to error-handler
            return_station = await stationService.addStation(data.return_station_name, data.return_station_id)
          }

          await tripService.addTrip(
            data.departure_time,
            data.return_time,
            departure_station,
            return_station,
            data.distance,
            data.duration
          )
        } catch {
          () => undefined
        }
      }
    } catch {
      () => undefined
    }
  }
}

module.exports = { import_csv }
