// Use dynamic import for redis to support both ESM and CJS
let createClient
try {
  const redis = await import('redis')
  createClient = redis.createClient
} catch {
  createClient = require('redis').createClient
}

class MessageBroker {
  constructor () {
    this.configured = false
    this.available = false

    if (process.env.MESSAGE_BROKER_URL) {
      this.configured = true
      this.client = createClient({
        url: process.env.MESSAGE_BROKER_URL 
      })
  
      this.handlers = {}
  
      this.client.on('error', (err) => console.error('Message Broker Error', err))
      this.client.on('connect', () => console.log('Message Broker Connected'))
    }
  }

  async connect () {
    await this.client.connect()
    this.available = true
  }

  async subscribe (channel) {
    await this.client.subscribe(channel, async (message) => {
      try {
        const update = JSON.parse(message)

        const handler = this.handlers[channel]
        if (handler) {
          await handler(update)
        } else {
          console.error('Missing handler for channel:', channel)
        }
      } catch (error) {
        console.error('Error processing message:', error)
      }
    })
  }

  registerHandler (channel, handler) {
    this.handlers[channel] = handler
  }

  async publish (channel, message) {
    await this.client.publish(channel, JSON.stringify(message))
  }

  async quit () {
    await this.client.quit()
  }
}

// Support both ESM and CJS exports
const messageBroker = new MessageBroker()

export { messageBroker }
export default messageBroker

// For CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = messageBroker
  module.exports.messageBroker = messageBroker
}
