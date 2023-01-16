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
      //csvParser will parse the entire file to a large daraArray that has the valid lines in the correct format.
      const dataArray = await csvParser(path + '/' + file)
      for (const data of dataArray){
        try {
          let departure_station = await stationService.getStation(data.departure_station_name, data.departure_station_id)
          //If the departure station did not exist create it, if it is valid.
          if (!departure_station) {
            departure_station = await stationService.addStation(data.departure_station_name, data.departure_station_id)
          }

          let return_station = await stationService.getStation(data.return_station_name, data.return_station_id)
          //If the return station did not exist create it, if it is valid.
          if (!return_station) {
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
