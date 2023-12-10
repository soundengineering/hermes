import mongoose from 'mongoose'

const RoleSchema = new mongoose.Schema({
  mods: [String],
  admins: [String],
  creators: [String]
})

const LastFmSchema = new mongoose.Schema({
  username: String,
  password: String,
  api_key: String,
  api_secret: String
})

const DiscordSchema = new mongoose.Schema({
  serverId: String,
  channelId: String,
  mode: String
})

const ChannelSchema = new mongoose.Schema({
  websocketEndpoint: String,
  serverEndpoint: String,

  slug: { type: String, required: true, index: true },
  genre: String,
  title: String,
  promoImageUrl: String,
  promoImageHref: String,
  infoLink: String,
  writeBookmarkedToPlaylist: { type: Boolean, default: false },
  bookmarkedPlaylist: String,
  writeBoofMarkToPlaylist: { type: Boolean, default: false },
  boofMarkPlaylist: String,
  writeThisIsPlaylist: { type: Boolean, default: false },
  thisIsPlaylist: String,
  greeting: String,
  channelCalendarLink: String,
  deleted: { type: Boolean, default: false },
  maxTurns: Number,
  roles: { type: RoleSchema },
  banned: [String],
  visibility: { type: String, default: 'public' },
  nowPlaying: { type: Object },
  lastPlayed: { type: Object },
  limitDjs: { type: Boolean, default: false },
  maxDjs: { type: Number, default: 5 },
  maxBots: { type: Number, default: 1 },
  users: { type: Array, default: [] },
  djs: { type: Array, default: [] },
  djsTitle: String,
  listenersTitle: String,
  activeDjTitle: String,
  chatPrompt: String,
  chatFilter: { type: Number, default: 0 },
  password: { type: String },
  nojoin: { type: Boolean, default: false },
  disableAutoReact: { type: Boolean, default: false },
  lastfm: { type: LastFmSchema },
  discord: { type: DiscordSchema },
  followers: [{ type: String }],
  sameRoleCanKick: { type: Boolean, default: false },
  createdDate: {
    type: Date,
    default: function () {
      return Date.now()
    }
  },
  lastTouched: {
    type: Date,
    default: function () {
      return Date.now()
    }
  }
})

ChannelSchema.index({ slug: 1 }, {
  unique: true,
  partialFilterExpression: {
    slug: { $type: 'string' }
  }
})

export default {
  Schema: ChannelSchema,
  Name: 'Channels',
  id: 'channels'
}
