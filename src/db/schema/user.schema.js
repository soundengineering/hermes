import mongoose from 'mongoose'

const ChatSettingsSchema = new mongoose.Schema({
  muted: [String]
})

const GeneralSettingsSchema = new mongoose.Schema({
  preferredPlayer: String,
  createWebPlayers: { type: Boolean, default: true },
  autoPlay: { type: Boolean, default: false },
  autoPlayActive: { type: Boolean, default: true },
  autoPlayPrefferedPlayer: { type: Boolean, default: true }
})

const UsersSchema = new mongoose.Schema({
  spotifyUri: { type: String, index: true },
  image: { type: String, default: '/defaultUser.png' },
  djImage: { type: String, default: '/defaultUser.png' },
  thumbsUpImage: { type: String, default: '/defaultUser.png' },
  thumbsDownImage: { type: String, default: '/defaultUser.png' },
  country: String,
  queue: Object,
  userName: { type: String, required: true, unique: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  displayName: { type: String, index: true },
  lastAuthenticated: Date,
  createdDate: {
    type: Date,
    default: function () {
      return Date.now()
    }
  },
  lastTouched: Date,
  accountCreated: Date,
  emailConfirmed: Boolean,
  serverId: String,
  emailSettings: { type: Object },
  queueSettings: { type: Object },
  profileSettings: { type: Object },
  chatSettings: { type: ChatSettingsSchema },
  generalSettings: { type: GeneralSettingsSchema },
  links: { type: Object },
  stats: { type: Object },
  theme: { type: String, default: 'dark' },
  bio: String,
  notificationSettings: {
    userMentions: { type: Boolean, default: true },
    botMentions: { type: Boolean, default: true }
  },
  nativeNotifications: {
    enabled: { type: Boolean, default: false },
    devices: [{
      deviceId: { type: String },
      subscription: { type: Object }
    }]
  },
  siteAdmin: { type: Boolean, default: false },
  logChats: { type: Boolean, default: false },
  badge: String,
  // for bot accounts
  channelId: { type: String },
  type: { type: String },
  apiKey: { type: String }
})

export default {
  Schema: UsersSchema,
  Name: 'Users',
  id: 'users'
}
