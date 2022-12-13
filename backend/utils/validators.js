//Time must be a string that can be parsed to date
const validateTime = (time) => {
  const date = Date.parse(time)
  if (!date) {
    return false
  }
  return true
}

//Id must be an integer
const validateId = (id) => {
  const id_num = Number(id)
  //Id of 0 is valid
  if (id_num.isNaN || id < 0) {
    return false
  }
  if (!(Number.isInteger(id_num))) {
    return false
  }
  return true
}

//Station name must be a non-empty string
const validateStationName = (name) => {
  if (!name) {
    return false
  }
  const name_str = String(name)
  if (!name_str) {
    return false
  }
  return true
}

//Distance must be an integer with at least value of 10
const validateDistance = (distance) => {
  const distance_num = Number(distance)
  if (!distance_num || distance_num < 10) {
    return false
  }
  if (!(Number.isInteger(distance_num))) {
    return false
  }
  return true
}

//Duration must be at least 10 seconds
//Duration must match the difference between departure_time and return_time within 10% difference
//Return_time must be later than departure_time
const validateDurationWithTimes = (departure_time, return_time, duration) => {
  const departure_date = new Date(departure_time)
  const return_date = new Date(return_time)
  //Ensure that dates exist
  if (!departure_date || !return_date) {
    return false
  }
  //Validate duration
  if (!validateDuration(duration)) {
    return false
  }
  //Parse duration to number
  const duration_num = Number(duration)
  //Calculate the trip length in seconds
  const difference_seconds = Math.round((return_date-departure_date)/1000)
  //Calculate the ratio. This should be really close to 1 with good data.
  const ratio = difference_seconds/duration_num
  if (ratio<0.95 || ratio > 1.05) {
    return false
  }
  return true
}

const validateDuration = (duration) => {
  //Parse duration to number
  const duration_num = Number(duration)
  if (!duration_num || duration_num < 10) {
    return false
  }
  if (!(Number.isInteger(duration_num))) {
    return false
  }
  return true
}

//Validates a line from csv.
//Expected format: Departure,Return,Departure station id,Departure station name,Return station id,Return station name,Covered distance (m),Duration (sec.)
const validateLine = (line) => {
  if (!line) {
    return false
  }
  const data = line.split(',')
  if (data.length !== 8) {
    return false
  }
  const departure_time = data[0]
  const return_time = data[1]
  const departure_station_id = data[2]
  const departure_station_name = data[3]
  const return_station_id = data[4]
  const return_station_name = data[5]
  const distance = data[6]
  const duration = data[7]
  if (
    validateTime(departure_time) &&
    validateTime(return_time) &&
    validateId(departure_station_id) &&
    validateStationName(departure_station_name) &&
    validateId(return_station_id) &&
    validateStationName(return_station_name) &&
    validateDistance(distance) &&
    validateDurationWithTimes(departure_time, return_time, duration)
  ) {
    return true
  }
  return false
}

module.exports = {
  validateId,
  validateTime,
  validateStationName,
  validateLine,
  validateDistance,
  validateDuration,
  validateDurationWithTimes
}
