import axios from 'axios'

const addTrip = async(
  url,
  departure_time,
  return_time,
  departure_station_name,
  departure_station_id,
  return_station_name,
  return_station_id,
  distance,
  duration
) => {
  try {
    const res = await axios.post(url, {
      departure_time,
      return_time,
      departure_station_name,
      departure_station_id,
      return_station_name,
      return_station_id,
      distance,
      duration
    })
    return res.data
  } catch(e) {
    if (e.response.status === 400) {
      throw e
    }
    throw new Error('Failed to add trip')
  }
}

const getTrips = async(
  url,
  departure_time,
  return_time,
  departure_station_name,
  return_station_name,
  distance,
  duration
) => {
  try {
    const res = await axios.get(url, null,
      {
        params: {
          departure_time,
          return_time,
          departure_station_name,
          return_station_name,
          distance,
          duration
        }
      }
    )
    return res.data
  } catch(e) {
    if (e.response.status === 400) {
      throw e
    }
    throw new Error('Failed to add trip')
  }
}

export default { addTrip, getTrips }
