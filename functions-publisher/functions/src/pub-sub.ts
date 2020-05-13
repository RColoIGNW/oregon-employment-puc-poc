'use strict'

process.env.GOOGLE_APPLICATION_CREDENTIALS = __dirname + '../../sa.json'

// Imports the Google Cloud client library
import  { PubSub } from '@google-cloud/pubsub'

// Creates a client; cache this for further use
const pubSubClient = new PubSub()

interface PublishMessage {
  topicName: 'pua-claims' | 'pua-weekly-claims'
  data: any
}

export const publishMessage = async ({topicName, data}: PublishMessage) => {
  const dataBuffer = Buffer.from(data)
  const messageId = await pubSubClient
    .topic(topicName)
    .publish(dataBuffer)

  console.info(`Message ${messageId} published.`)
  return messageId
}

export default publishMessage
