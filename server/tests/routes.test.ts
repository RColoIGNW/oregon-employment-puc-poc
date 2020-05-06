import request from 'supertest'

import app from '../src/app'

describe('Health Check Endpoints', () => {
it('should create a new post', async () => {
    const res: any = await request(app)
      .get('/api/')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('message')
  })
})
