const dotenv = require('dotenv')
dotenv.config()

const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.MONGODB_URI_TEST
  : process.env.MONGODB_URI

const PORT = process.env.PORT

const IMPORT_DATA_PATH = process.env.IMPORT_DATA_PATH

const NODE_ENV = process.env.NODE_ENV

module.exports = {
  MONGODB_URI,
  PORT,
  IMPORT_DATA_PATH,
  NODE_ENV
}
