const mongoose = require('mongoose')

const ChatLogSchema = new mongoose.Schema({
  userId: { type: String },
  messages: [{
    channelId: { type: String },
    message: { type: String }
  }],
  createdDate: {
    type: Date,
    default: function () {
      return Date.now()
    }
  }
})

module.exports = {
  ChatLogSchema
}
