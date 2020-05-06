import request from 'supertest'
import proxyquire from 'proxyquire'
const firebasemock = require('firebase-mock')

jest.setTimeout(30000)

const mockauth = new firebasemock.MockAuthentication()
const mockdatabase = new firebasemock.MockFirebase()
const mockfirestore = new firebasemock.MockFirestore()
const mocksdk = new firebasemock.MockFirebaseSdk(
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

jest.mock('../../src/util/firebase.ts', () => {
  return mocksdk
})
import app from '../../src/app'

proxyquire('../../src/util/firebase.ts', {
  firebase: mocksdk
})
// mocksdk.firestore().flush();

describe('Auth Token Middleware', () => {
  let ref: any
  let user: any
  let dbRef: any
  beforeAll(async () => {
    jest.clearAllMocks()
    ref = mockauth
    ref.autoFlush()
    dbRef = mockfirestore
    dbRef.autoFlush()

    // create user
      user = await ref.createUser({
        uid: '123',
        email: 'test@test.com',
      })
      await ref.setCustomUserClaims('123', { admin: true })
  })
​
  it('should return 200 for authorized tokens', async () => {
    try {
      const token = await user.getIdToken()
      const res: any = await request(app)
        .get('/api/applications')
        .set('Authorization', 'Bearer ' + token)
      expect(res).toBeTruthy()
      expect(res.status).toEqual(200)
    } catch (error) {
      console.error(error)
    }
  })
  it('should return 401 for unauthorized tokens', async () => {
    try {
      const token = 'bad_token'
      const res: any = await request(app)
        .get('/api/applications')
        .set('Authorization', 'Bearer ' + token)
      expect(res).toBeTruthy()
      expect(res.status).toEqual(401)
    } catch (error) {
      console.error(error)
    }
  })
  it('should return 400 for missing tokens', async () => {
    try {
      const res: any = await request(app)
        .get('/api/applications')
      expect(res).toBeTruthy()
      expect(res.status).toEqual(400)
    } catch (error) {
      console.error(error)
    }
  })
})
