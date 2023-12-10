const mongoose = require('mongoose')

const AchievementsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  levels: [{
    title: { type: String, required: true },
    description: { type: String, required: true },
    icon: { type: String },
    goal: { type: Number, required: true }
  }]
})

module.exports = {
  AchievementsSchema
}
