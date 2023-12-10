/* global describe, it, expect, afterEach */

import Hermes from '../src/index'
import { mockClient } from 'aws-sdk-client-mock'
import { SSMClient, GetParametersByPathCommand } from '@aws-sdk/client-ssm'
import dotenv from 'dotenv'
import { jest } from '@jest/globals'

const ssmMock = mockClient(SSMClient)

describe('Hermes', () => {
  describe('lib shape', () => {
    it('should provide the Hermes instance', () => {
      expect(Hermes).toHaveProperty('db')
      expect(Hermes).toHaveProperty('loadParams')
      expect(Hermes).toHaveProperty('logger')
    })
  })
})

describe('loadParams', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  it('should load environment variables from .env file if NODE_ENV is development', async () => {
    process.env.NODE_ENV = 'development'
    jest.spyOn(dotenv, 'config')
    dotenv.config.mockImplementation(() => {})
    await Hermes.loadParams()
    expect(dotenv.config).toHaveBeenCalled()
  })

  it('should load environment variables from parameter store if NODE_ENV is not development or jest', async () => {
    process.env.NODE_ENV = 'production'
    process.env.AWS_REGION = 'us-west-2'
    process.env.PARAMETER_STORE_PATH = '/my-app'

    const mockParameters = [
      { Value: JSON.stringify({ KEY1: 'VALUE1', KEY2: 'VALUE2' }) },
      { Value: JSON.stringify({ KEY3: 'VALUE3', KEY4: 'VALUE4' }) }
    ]

    ssmMock.on(GetParametersByPathCommand).resolves(
      { Parameters: mockParameters })

    await Hermes.loadParams()

    expect(process.env.KEY1).toEqual('VALUE1')
    expect(process.env.KEY2).toEqual('VALUE2')
    expect(process.env.KEY3).toEqual('VALUE3')
    expect(process.env.KEY4).toEqual('VALUE4')
  })
})
