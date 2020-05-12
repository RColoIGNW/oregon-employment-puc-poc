import * as functions from 'firebase-functions'

export const applicationStarted = functions.firestore
  .document('applications/{applicationId}')
  .onCreate((snap) => {
    const newValue = snap.data()
    // perform desired operations ...
    console.info('Trigger App Started Pub/Sub Event',  newValue)
  })

export const applicationChanged = functions.firestore
  .document('applications/{applicationId}')
  .onUpdate((change) => {
    const newValue = change.after.data()
    // ...or the previous value before this update
    // const previousValue = change.before.data()
    // perform desired operations ...
    console.info('Trigger App Change Pub/Sub Event', newValue)
  })

export const applicationDeleted = functions.firestore
  .document('applications/{applicationId}')
  .onDelete((snap) => {
    const deletedValue = snap.data()
    // perform desired operations ...
    console.info('Trigger App Deleted Pub/Sub Event',  deletedValue)
  })

export const applicationSubscriber = functions.pubsub
  .topic('pua-claims')
  .onPublish((message, context) => {
    console.info(message.json)
    console.info('The function was triggered at ', context.timestamp)
    console.info('The unique ID for the event is', context.eventId)
  })

export const weeklyApplicationSubscriber = functions.pubsub
  .topic('pua-weekly-claims')
  .onPublish((message, context) => {
    console.info(message.json)
    console.info('The function was triggered at ', context.timestamp)
    console.info('The unique ID for the event is', context.eventId)
  })
