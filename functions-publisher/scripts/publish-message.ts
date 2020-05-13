'use strict'
process.env.GOOGLE_APPLICATION_CREDENTIALS = __dirname + '../sa.json'

// Imports the Google Cloud client library
import  { PubSub } from '@google-cloud/pubsub'

// Creates a client; cache this for further use
const pubSubClient = new PubSub()

// sample-metadata:
//   title: Publish Message
//   description: Publishes a message to a topic.
//   usage: node publishMessage.js <topic-name> <data>
function main(
  topicName = 'pua-claims',
  data = JSON.stringify({})
) {
  async function publishMessage() {
    const dataBuffer = Buffer.from(data)
    const messageId = await pubSubClient
      .topic(topicName)
      .publish(dataBuffer)
    console.info(`Message ${messageId} published.`)
  }

  publishMessage().catch(console.error)
}

main(...process.argv.slice(2))
