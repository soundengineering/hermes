const mongoose = require('mongoose')

const ProfileSettingsSchema = new mongoose.Schema({
  userId: { type: String, unique: true },
  displayLocation: { type: Boolean, default: false },
  customLocation: { type: String },
  followed: [String],
  followedBy: [String],
  blocked: [String],
  blockedBy: [String],
  followedChannels: [String]
})

module.exports = {
  ProfileSettingsSchema
}
