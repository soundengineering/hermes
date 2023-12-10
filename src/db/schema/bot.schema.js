const mongoose = require('mongoose')

const BotSchema = new mongoose.Schema({
  id: Number,
  channelId: String,
  displayName: String,
  image: { type: String, default: '/defaultUser.png' },
  djImage: { type: String, default: '/defaultUser.png' },
  thumbsUpImage: { type: String, default: '/defaultUser.png' },
  thumbsDownImage: { type: String, default: '/defaultUser.png' },
  enabled: { type: Boolean, default: false },
  nowPlayingResponses: { type: Boolean, default: false },
  keywordResponses: { type: Boolean, default: false },
  announceUsers: { type: Boolean, default: false },
  autoAnnounceFirsts: { type: Boolean, default: false },
  personality: String,
  commands: { type: Object }
})

module.exports = {
  BotSchema
}
