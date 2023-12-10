const mongoose = require('mongoose')

const NotificationsSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  notifications: [{
    title: { type: String, required: true },
    message: { type: String, required: true },
    icon: { type: String },
    read: { type: Date },
    relatedUser: {
      id: { type: String },
      displayName: { type: String }
    },
    relatedChannel: {
      slug: { type: String },
      title: { type: String }
    },
    type: { type: String },
    visualIndicator: { type: String },
    occurrences: { type: Number },
    createdDate: {
      type: Date,
      default: function () {
        return Date.now()
      }
    }
  }]
})

module.exports = {
  NotificationsSchema
}

/*
HOW TO UPDATE SINGLE ARRAY ELEMENT

db.my_collection.update(
  {_id: ObjectId(document_id), my_array.1 : 1 },
  { $set: { "my_array.$.content" : "NEW content B" } }
)

 */
