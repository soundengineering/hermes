require('module-alias/register')

module.exports = async (globals) => {
  console.log('Running Jest globalSetup')

  process.env.NODE_ENV = 'jest'
  process.env.DB_COLLECTIONS_MONGO = 'User,Channel'
}
