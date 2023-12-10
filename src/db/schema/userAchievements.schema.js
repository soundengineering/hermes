const mongoose = require('mongoose')

const UserAchievementsSchema = new mongoose.Schema({
  achievementId: { type: String, required: true },
  userId: { type: String, index: true, required: true },
  progress: { type: Number, required: true },
  updatedDate: {
    type: Date,
    default: function () {
      return Date.now()
    }
  }
})

module.exports = {
  UserAchievementsSchema
}
