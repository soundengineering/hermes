const mongoose = require('mongoose')

const SessionSchema = new mongoose.Schema({
  data: String,
  exp: Date,
  iat: Date
})

module.exports = {
  SessionSchema
}
