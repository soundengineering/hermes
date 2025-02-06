import { createClient } from 'redis'

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

export const messageBroker = new MessageBroker()