import axios from 'axios'

//Fetches stations from url
const getStations = async(url) => {
  try {
    const res = await axios.get(url)
    return res.data
  } catch(e) {
    //Handling no stations found error differently
    if (e.response && e.response.status === 404) {
      throw new Error('No stations found')
    }
    throw new Error('Failed to get station')
  }
}

const getStationByName = async(url, name) => {
  try {
    const res = await axios.get(`${url}/${name}`)
    return res.data
  } catch (e) {
    //Handling no stations found error differently
    if (e.response && e.response.status === 404) {
      throw new Error('No station found')
    }
    if (e.response && e.response.staus === 400) {
    //This way we can handle validation errors differently
      throw new Error('Invalid or missing station information')
    }
    throw new Error('Failed to get station')
  }
}

const addStation = async(url, name, station_id) => {
  try {
    const res = await axios.post(url, { name, station_id })
    return res.data
  } catch (e) {
    //This way we can handle validation errors differently
    if (e.response && e.response.staus === 400) {
      throw new Error('Invalid or missing station information')
    }
    throw new Error('Failed to add station')
  }
}

export default { addStation, getStations, getStationByName  }
