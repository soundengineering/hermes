const aliases = require('module-alias-jest/register')

const config = {
  verbose: true,
  testEnvironment: 'node',
  globalSetup: './test/global-setup.cjs',
  globalTeardown: './test/global-teardown.cjs'
}

config.moduleNameMapper = aliases.jest
config.moduleNameMapper.uuid = require.resolve('uuid')

module.exports = config
