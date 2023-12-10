import jwt from 'jsonwebtoken'
import db from '@root/db/index.mjs'

export async function findChannelAndRole (channelId, userId) {
  const channel = await db.Channels.findOne({ id: channelId })
  if (!channel) {
    return { role: 0, channel: null }
  }

  if (!channel.roles) {
    // whoops? uh
    // fix channel?
    return { role: 0, channel }
  } else if (channel.roles.creators.includes(userId)) {
    return { role: 10, channel }
  } else if (channel.roles.admins.includes(userId)) {
    return { role: 5, channel }
  } else if (channel.roles.mods.includes(userId)) {
    return { role: 3, channel }
  } else {
    return { role: 0, channel }
  }
}

export async function verifyRole ({ channelId, userId, role }) {
  if (role > 10) {
    // site admin
    const user = await db.Users.findOne({ _id: userId })
    if (!user.siteAdmin) {
      throw new Error('Not Found')
    }
    return true
  } else {
    // given a channel id, and a user id, return the role of the user and the channel
    const { role, channel } = await JwtLib.findChannelAndRole(channelId, userId)
    if (!channel || role < 5) {
      throw new Error('Not Authorized')
    }
    return true
  }
}

export async function verifyJWT ({ authorization }) {
  if (!(process.env.PUBLIC_KEY || process.env.PUBLIC_KEY.length > 0)) {
    throw new Error('Forbidden')
  }

  // if the authoriztion header is prefixed with "bearer " remove it
  const bearer = /^[B|b]earer\s/
  if (
    authorization &&
    authorization !== 'null'
  ) {
    if (bearer.test(authorization)) {
      authorization = authorization.replace(bearer, '')
    }
  } else {
    throw new Error('Forbidden')
  }

  // verify the token
  const decoded = jwt.verify(
    authorization,
    process.env.PUBLIC_KEY,
    { algorithm: 'RS256' })
  return decoded
}

// exporting the default object allows us to mock the functions in tests
const JwtLib = {
  findChannelAndRole,
  verifyRole,
  verifyJWT,
  jwt
}

export default JwtLib
