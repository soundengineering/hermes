const mongoose = require('mongoose')

const ChannelChatSchema = new mongoose.Schema({
  channelId: { type: String, required: true, index: true },
  version: { type: Number, default: 0 }, // set to an epoch when this chat log is archived. Current version is 0.
  chat: [{ type: Object }],
  createdDate: {
    type: Date,
    default: function () {
      return Date.now()
    }
  }
})

module.exports = {
  ChannelChatSchema
}
