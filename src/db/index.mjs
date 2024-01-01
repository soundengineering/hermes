// const logger = require('./logger.js')
import mongoose from 'mongoose'
import schemas from './schema/index.js'

mongoose.connection.on('connected', () => {
  console.info('MongoDB connected')
})
mongoose.connection.on('disconnected', () => {
  console.info('MongoDB disconnected')
})
mongoose.connection.on('error', (error) => {
  console.error('MongoDB error', error)
})

export class MongooseDbClass {
  constructor () {
    this.mongoose = mongoose
    let collections = []
    try {
      collections = process.env.DB_COLLECTIONS_MONGO.split(',')
      if (collections.length === 0) {
        throw new Error('No collections found in DB_COLLECTIONS_MONGO')
      }
    } catch (error) {
      // console.error(error)
    }

    collections.forEach(collection => {
      const { Name, Schema, id } = schemas[collection]
      this[Name] = mongoose.model(id, Schema)
    })
  }

  async connect () {
    const dbParams = {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }
    if (process.env.DB_AUTH_MONGO) {
      dbParams.auth = process.env.DB_AUTH_MONGO
    }

    return await mongoose.connect(`${process.env.DB_HOST_MONGO}/${process.env.DB_NAME_MONGO}`, dbParams)
  }
}

export default MongooseDbClass
