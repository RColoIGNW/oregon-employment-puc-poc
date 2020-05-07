import request from 'supertest'
import proxyquire from 'proxyquire'
const firebasemock = require('firebase-mock')

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

jest.mock('../src/util/firebase.ts', () => {
  return mocksdk
})

import app from '../src/app'

proxyquire('../src/util/firebase.ts', {
  firebase: mocksdk
})

describe('Integration Tests', () => {
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

  afterAll(() => {
    ref.autoFlush()
    dbRef.autoFlush()
  })

  const mockRequest = {
    id: 'fakeid',
    userId: 'uid',
    applicant: {
      firstName: 'John',
      middleName: 'Jo',
      lastName: 'Smith',
      ssn: '123456789',
      dob: new Date(),
      phone: '5555555555',
      email: 'testing@testing.com',
      races: [] as any,
    },
    employmentRecords: new Array(5).fill({
      employer: {
        name: 'Nike',
        phone: '555-555-5555',
        address: {
          street: 'some street',
          city: 'Portland',
          state: 'OR',
          zipCode: '97201'
        }
      },
      id: 'employerId',
      ended: 'some-date',
      started: 'another-date'
    }).map(item => item),
    answers: [{
      questionCode: 'C_1',
      selectedOption: 'YES',
      detailInfo: 'string',
      subQuestionsAnwers: [{
        questionCode: 'C_1_1',
        selectedOption: 'YES',
        detailInfo: 'string',
      }],
    }]
} as any
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
  it('should return 403 for GET applications without admin claim', async () => {
    try {
      user = await ref.createUser({
        uid: '1234',
        email: 'testing@testing.com',
      })
      await ref.setCustomUserClaims('1234', { admin: false })

      const token = await user.getIdToken()
      const res: any = await request(app)
        .get('/api/applications')
        .set('Authorization', 'Bearer ' + token)
      expect(res).toBeTruthy()
      expect(res.status).toEqual(403)
    } catch (error) {
      console.error(error)
    }
  })
  it('should create a new application for an authenticated user', async () => {
    const token = await user.getIdToken()
    const res: any = await request(app)
      .put('/api/applications')
      .set('Authorization', 'Bearer ' + token)
      .send(mockRequest)
    expect(res.statusCode).toEqual(200)
  })
  it('should overwrite a new application for an authenticated user', async () => {
    const token = await user.getIdToken()
    const res: any = await request(app)
      .put('/api/applications/fakeiid')
      .set('Authorization', 'Bearer ' + token)
      .send(mockRequest)
    expect(res.statusCode).toEqual(204)
  })
  it('should update a new application for an authenticated user', async () => {
    const token = await user.getIdToken()
    const res: any = await request(app)
      .patch('/api/applications/fakeiid')
      .set('Authorization', 'Bearer ' + token)
      .send(mockRequest)
    expect(res.statusCode).toEqual(204)
  })
  it('should get a new application for an authenticated user', async () => {
    const token = await user.getIdToken()
    const res: any = await request(app)
      .get('/api/applications/fakeiid')
      .set('Authorization', 'Bearer ' + token)
    expect(res.statusCode).toEqual(200)
  })
  it('should delete a new application for an authenticated user', async () => {
    user = await ref.createUser({
      uid: '123d',
      email: 'testd@test.com',
    })
    await ref.setCustomUserClaims('123d', { admin: true })
    const token = await user.getIdToken()
    const res: any = await request(app)
      .delete('/api/applications/fakeiid')
      .set('Authorization', 'Bearer ' + token)
    expect(res.statusCode).toEqual(204)
  })
  it('should submit a new application for an authenticated user', async () => {
    user = await ref.createUser({
      uid: '123submit',
      email: 'testsubmit@test.com',
    })
    await ref.setCustomUserClaims('123submit', { admin: true })
    const token = await user.getIdToken()
    const res: any = await request(app)
      .patch('/api/applications/fakeiid/submit')
      .set('Authorization', 'Bearer ' + token)
      .send(mockRequest)
    expect(res.statusCode).toEqual(200)
  })
  it('should submit a new weekly application for an authenticated user', async () => {
    user = await ref.createUser({
      uid: '123weeklysubmit',
      email: 'testweeklysubmit@test.com',
    })
    await ref.setCustomUserClaims('123weeklysubmit', { admin: true })
    const token = await user.getIdToken()
    const res: any = await request(app)
      .patch('/api/weekly-applications/fakeiid/submit')
      .set('Authorization', 'Bearer ' + token)
      .send(mockRequest)
    expect(res.statusCode).toEqual(200)
  })
  it('should generate a pdf form for an authenticated user', async () => {
    user = await ref.createUser({
      uid: '123pdf',
      email: 'testpdf@test.com',
    })
    await ref.setCustomUserClaims('123pdf', { admin: true })
    const token = await user.getIdToken()
    const res: any = await request(app)
      .get('/api/generate-pdf/fakeiid')
      .set('Authorization', 'Bearer ' + token)
    expect(res.statusCode).toEqual(200)
  })
  it('should return 400 for invalid request objects', async () => {
    user = await ref.createUser({
      uid: 'badData',
      email: 'testbadsubmit@test.com',
    })
    await ref.setCustomUserClaims('badData', { admin: true })
    const token = await user.getIdToken()
    const res: any = await request(app)
      .patch('/api/applications/fakeiid/submit')
      .set('Authorization', 'Bearer ' + token)
      .send({badData: true})
    expect(res.statusCode).toEqual(400)
  })
  it('should get all applications for an authenticated user', async () => {
    const token = await user.getIdToken()
    const res: any = await request(app)
      .get('/api/users/some-user-id/applications')
      .set('Authorization', 'Bearer ' + token)
    expect(res.statusCode).toEqual(200)
  })
})
