const mongoose = require('mongoose')

const PlaylistSchema = new mongoose.Schema({
  spotifyQueueUri: { type: String },
  spotifyStarredUri: { type: String },
  userId: { type: String, index: true, required: true }
})

module.exports = {
  PlaylistSchema
}
