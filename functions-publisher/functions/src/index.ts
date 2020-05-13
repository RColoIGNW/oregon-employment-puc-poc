import * as functions from 'firebase-functions'

import publishMessage from './pub-sub'

export const onApplicationStarted = functions.firestore
  .document('applications/{applicationId}')
  .onCreate(async (snap: any, context: any) => {
    const newValue = snap.data()
    const data = { id: context.params.applicationId }
    await publishMessage({ topicName: 'pua-claims', data })
    console.info('Triggered Application Started Pub/Sub Event',  newValue)
  })

export const onApplicationChanged = functions.firestore
  .document('applications/{applicationId}')
  .onUpdate(async (change: any, context: any) => {
    const newValue = change.after.data()
    const data = { id: context.params.applicationId }
    // ...or the previous value before this update
    // const previousValue = change.before.data()
    await publishMessage({ topicName: 'pua-claims', data })
    console.info('Triggered Application Change Pub/Sub Event', newValue)
  })

export const onApplicationDeleted = functions.firestore
  .document('applications/{applicationId}')
  .onDelete(async (snap: any, context: any) => {
    const deletedValue = snap.data()
    const data = { id: context.params.applicationId }
    await publishMessage({ topicName: 'pua-claims', data })
    console.info('Trigger Application Deleted Pub/Sub Event',  deletedValue)
  })

export const applicationSubscriber = functions.pubsub
  .topic('pua-claims')
  .onPublish(async (message: any, context: any) => {
    console.info(message.json)
    console.info('The function was triggered at ', context.timestamp)
    console.info('The unique ID for the event is', context.eventId)
  })

export const weeklyApplicationSubscriber = functions.pubsub
  .topic('pua-weekly-claims')
  .onPublish((message: any, context: any) => {
    console.info(message.json)
    console.info('The function was triggered at ', context.timestamp)
    console.info('The unique ID for the event is', context.eventId)
  })
