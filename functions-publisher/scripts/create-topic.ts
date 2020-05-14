// Imports the Google Cloud client library
process.env.GOOGLE_APPLICATION_CREDENTIALS = './sa.json'

import { PubSub } from '@google-cloud/pubsub'

// Creates a client; cache this for further use
const pubSubClient = new PubSub({
  projectId: 'oregon-pua-poc'
})
// sample-metadata:
//   title: Create Topic
//   description: Creates a new topic.
//   usage: node createTopic.js <topic-name>
async function main(topicName = 'pua-claims') {
  async function createTopic() {
    try {
      const topicAlreadyExists = await pubSubClient.topic(topicName).exists()
      if (topicAlreadyExists) {
        console.info('Topic already exists. Exitting early.', topicAlreadyExists)
        process.exit(0)
      }

      // Creates a new topic
      await pubSubClient.createTopic(topicName)
      console.info(`Topic ${topicName} created.`)
    } catch (error) {
      console.error(error)
      process.exit(-1)
    }
  }

  createTopic()
}

main(...process.argv.slice(2)).catch(e => {
  console.error(e)
  process.exitCode = -1
})
