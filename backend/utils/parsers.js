const fs = require('fs')
const validators = require('./validators')
//Parses a string with format: Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)
//Expects the line to be validated beforehand
const parseDatapoint = (line) => {
  const data = line.split(',')
  const datapoint = {
    departure_time: data[0],
    return_time: data[1],
    departure_station_id: Number(data[2]),
    departure_station_name: data[3],
    return_station_id: Number(data[4]),
    return_station_name: data[5],
    distance: Number(data[6]),
    duration: Number(data[7])
  }
  return datapoint
}

//Reads the given file and parses it into a array of datapoints
const csvParser = async(filename) => {
  const datapoints = []
  try {
    const lines = fs.readFileSync(filename, { encoding:'utf-8' }).split('\n')
    for await(const line of lines) {
      //Check if the line is valid. If not, ignore
      if (!validators.validateLine(line)) {
        continue
      }
      const datapoint = parseDatapoint(line)
      datapoints.push(datapoint)
    }
  } catch(e) {
    throw new Error('Missing or invalid filename')
  }
  return datapoints
}

module.exports = {
  csvParser,
  parseDatapoint
}
