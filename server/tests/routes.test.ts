import request from 'supertest'

import app from '../src/app'
import {
  mockauth,
  mockfirestore,
  mocksdk,
} from './__util__/test-util'

const mockRequest = { id: 'fakeid', userId: 'uid', applicant: {
  firstName: 'John',
  middleName: 'Jo',
  lastName: 'Smith',
  ssn: '123456789',
  dob: new Date(),
  phone: '5555555555',
  email: 'testing@testing.com',
  races: [] as any,
} } as any

describe('Health Check Endpoints', () => {
  it('should check the api service', async () => {
    const res: any = await request(app)
      .get('/api/')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('message')
  })
})

describe('Application Routes', () => {
  let reff: any
  let userr: any
  let dbReff: any
  beforeAll(async () => {
    jest.mock('../src/util/firebase.ts', () => {
      return mocksdk
    })
    jest.clearAllMocks()
    reff = mockauth
    reff.autoFlush()
    dbReff = mockfirestore
    dbReff.autoFlush()

    // create user
    userr = await reff.createUser({
      uid: '123',
      email: 'test@test.com',
    })
    await reff.setCustomUserClaims('123', { admin: true })
  })
  it('should allow writes for authenticated users', async () => {
    jest.mock('../src/util/firebase.ts', () => {
      return mocksdk
    })
    const token = await userr.getIdToken()
    const res: any = await request(app)
      .put('/api/applications/fakeiid')
      .set('Authorization', 'Bearer ' + token)
      .send(mockRequest)
    expect(res.statusCode).toEqual(204)
  })
})
