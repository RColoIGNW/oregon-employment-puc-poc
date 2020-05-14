'use strict'

import  { PubSub } from '@google-cloud/pubsub'

const pubSubClient = new PubSub()

interface PublishMessage {
  topicName: 'pua-claims' | 'pua-weekly-claims'
  data: any
}

export const publishMessage = async ({topicName, data}: PublishMessage) => {
  const dataBuffer = Buffer.from(JSON.stringify(data))
  const messageId = await pubSubClient
    .topic(topicName)
    .publish(dataBuffer)

  console.info(`Message ${messageId} published.`)
  return messageId
}

export default publishMessage
