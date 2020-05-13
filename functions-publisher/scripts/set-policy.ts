process.env.GOOGLE_APPLICATION_CREDENTIALS = './sa.json'

'use strict';

// sample-metadata:
//   title: Set Topic IAM Policy
//   description: Sets the IAM policy for a topic.
//   usage: node setTopicPolicy.js <topic-name>

function main(topicName = 'pua-claims') {
  // [START pubsub_set_topic_policy]
  /**
   * TODO(developer): Uncomment this variable before running the sample.
   */
  // const topicName = 'YOUR_TOPIC_NAME';

  // Imports the Google Cloud client library
  const {PubSub} = require('@google-cloud/pubsub');

  // Creates a client; cache this for further use
  const pubSubClient = new PubSub();

  async function setTopicPolicy() {
    // The new IAM policy
    const newPolicy = {
      bindings: [
        {
          // Add a group as editors
          role: 'roles/pubsub.editor',
          members: ['group:cloud-logs@google.com'],
        },
        {
          // Add all users as viewers
          role: 'roles/pubsub.viewer',
          members: ['allUsers'],
        },
      ],
    };

    // Updates the IAM policy for the topic
    const [updatedPolicy] = await pubSubClient
      .topic(topicName)
      .iam.setPolicy(newPolicy);
    console.log('Updated policy for topic: %j', updatedPolicy.bindings);
  }

  setTopicPolicy().catch(console.error);
  // [END pubsub_set_topic_policy]
}

main(...process.argv.slice(2));
