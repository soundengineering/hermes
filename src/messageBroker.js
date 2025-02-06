import { createClient } from 'redis'

class MessageBroker {
  constructor() {
    this.client = null
    this.handlers = {}
  }

  async connect(config = {}) {
    this.client = createClient(config)
    await this.client.connect()
    return this
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

// Create and export the instance
const messageBroker = new MessageBroker()

// Only use ESM exports - esbuild will handle the CommonJS conversion
export { messageBroker }
export default messageBroker
