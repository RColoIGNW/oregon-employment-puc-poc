import proxyquire from 'proxyquire'
// import request from 'supertest'

// import app from '../../src/app'

const firebasemock = require('firebase-mock')

export const mockauth = new firebasemock.MockAuthentication()
export const mockdatabase = new firebasemock.MockFirebase()
export const mockfirestore = new firebasemock.MockFirestore()
export const mocksdk = new firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  (path: string): any => {
    return path ? mockdatabase.child(path) : mockdatabase
  },
  // use null if your code does not use AUTHENTICATION
  (): any => {
    return mockauth
  },
  // use null if your code does not use FIRESTORE
  (): any => {
    return mockfirestore
  },
  // use null if your code does not use STORAGE
  (): any => {
    return null
  },
  // use null if your code does not use MESSAGING
  (): any => {
    return null
  }
)

jest.mock('firebase-admin', () => {
  return mocksdk
})


proxyquire('../../src/util/firebase.ts', {
  firebase: mocksdk
})

// export let reff: any
// export let userr: any
// export let dbReff: any
// beforeAll(async () => {
//   jest.clearAllMocks()
//   reff = mockauth
//   reff.autoFlush()
//   dbReff = mockfirestore
//   dbReff.autoFlush()

//   // create user
//   userr = await reff.createUser({
//     uid: '123',
//     email: 'test@test.com',
//   })
//   await reff.setCustomUserClaims('123', { admin: true })
// })
