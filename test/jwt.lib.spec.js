import db from '@root/db/index.mjs'
import JwtLib from '@root/jwt.lib.mjs'
import { jest } from '@jest/globals'

/* global describe, it, beforeEach, afterEach, expect */

describe('JwtLib.findChannelAndRole', function () {
  afterEach(function () {
    jest.restoreAllMocks()
  })

  it('should return role 0 and channel if no roles', async function () {
    const channel = { id: 1 }
    jest.spyOn(db.Channels, 'findOne').mockImplementation(() => Promise.resolve(channel))

    const result = await JwtLib.findChannelAndRole(1, 1)
    expect(result).toEqual({ role: 0, channel })
  })

  it('should return role 10 if user is a creator', async function () {
    const channel = { id: 1, roles: { creators: [1], admins: [], mods: [] } }
    jest.spyOn(db.Channels, 'findOne').mockImplementation(() => Promise.resolve(channel))

    const result = await JwtLib.findChannelAndRole(1, 1)
    expect(result).toEqual({ role: 10, channel })
  })

  // Add similar tests for admins and mods
  it('should return role 5 if user is an admin', async function () {
    const channel = { id: 1, roles: { creators: [], admins: [1], mods: [] } }
    jest.spyOn(db.Channels, 'findOne').mockImplementation(() => Promise.resolve(channel))

    const result = await JwtLib.findChannelAndRole(1, 1)
    expect(result).toEqual({ role: 5, channel })
  })

  it('should return role 3 if user is a mod', async function () {
    const channel = { id: 1, roles: { creators: [], admins: [], mods: [1] } }
    jest.spyOn(db.Channels, 'findOne').mockImplementation(() => Promise.resolve(channel))

    const result = await JwtLib.findChannelAndRole(1, 1)
    expect(result).toEqual({ role: 3, channel })
  })

  it('should return role 0 if user is not a creator, admin, or mod', async function () {
    const channel = { id: 1, roles: { creators: [], admins: [], mods: [] } }
    jest.spyOn(db.Channels, 'findOne').mockImplementation(() => Promise.resolve(channel))

    const result = await JwtLib.findChannelAndRole(1, 1)
    expect(result).toEqual({ role: 0, channel })
  })

  it('should return role 0 if channel does not exist', async function () {
    jest.spyOn(db.Channels, 'findOne').mockImplementation(() => Promise.resolve(null))

    const result = await JwtLib.findChannelAndRole(1, 1)
    expect(result).toEqual({ role: 0, channel: null })
  })

  it('should return role 0 if channel does not have a roles object', async function () {
    const channel = { id: 1 }
    jest.spyOn(db.Channels, 'findOne').mockImplementation(() => Promise.resolve(channel))

    const result = await JwtLib.findChannelAndRole(1, 1)
    expect(result).toEqual({ role: 0, channel })
  })
})

describe('JwtLib.verifyRole', function () {
  afterEach(function () {
    jest.restoreAllMocks()
  })

  it('should throw an error if user is not a site admin', async function () {
    jest.spyOn(db.Users, 'findOne').mockImplementation(() => Promise.resolve({ siteAdmin: false }))

    try {
      await JwtLib.verifyRole({ channelId: 1, userId: 1, role: 11 })
      expect.fail('Expected error was not thrown')
    } catch (err) {
      expect(err.message).toBe('Not Found')
    }
  })

  it('should return true if user is a site admin', async function () {
    jest.spyOn(db.Users, 'findOne').mockImplementation(() => Promise.resolve({ siteAdmin: true }))

    const result = await JwtLib.verifyRole({ channelId: 1, userId: 1, role: 11 })
    expect(result).toBeTruthy()
  })

  it('should throw an error if user role is less than 5', async function () {
    jest.spyOn(JwtLib, 'findChannelAndRole').mockImplementation(() => Promise.resolve({ role: 4, channel: {} }))

    try {
      await JwtLib.verifyRole({ channelId: 1, userId: 1, role: 4 })
      expect.fail('Expected error was not thrown')
    } catch (err) {
      expect(err.message).toBe('Not Authorized')
    }
  })
})

describe('JwtLib.verifyJWT', function () {
  beforeEach(function () {
    process.env.PUBLIC_KEY = 'somekey'
  })
  afterEach(function () {
    jest.restoreAllMocks()
  })
  it('should throw an error if no public key', async function () {
    process.env.PUBLIC_KEY = ''
    try {
      await JwtLib.verifyJWT({ authorization: 'sometoken' })
      expect.fail('Expected error was not thrown')
    } catch (err) {
      expect(err.message).toBe('Forbidden')
    }
  })

  it('should throw an error if authorization is null', async function () {
    try {
      await JwtLib.verifyJWT({ authorization: null })
      expect.fail('Expected error was not thrown')
    } catch (err) {
      expect(err.message).toBe('Forbidden')
    }
  })

  it('should remove "bearer " prefix from authorization', async function () {
    const token = 'sometoken'
    jest.spyOn(JwtLib.jwt, 'verify').mockImplementation(() => { return { some: 'payload' } })

    const result = await JwtLib.verifyJWT({ authorization: `bearer ${token}` })
    expect(JwtLib.jwt.verify).toHaveBeenCalledWith(token, 'somekey', { algorithm: 'RS256' })
    expect(result).toEqual({ some: 'payload' })
  })

  it('should verify the token and return the decoded payload', async function () {
    const token = 'sometoken'
    const payload = { some: 'payload' }
    jest.spyOn(JwtLib.jwt, 'verify').mockImplementation(() => payload)

    const result = await JwtLib.verifyJWT({ authorization: token })
    expect(result).toEqual(payload)
  })

  // Add more tests as needed
})
