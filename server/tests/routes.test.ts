import request from 'supertest'

import app from '../src/app'

describe('Health Check Endpoints', () => {
  it('should check the api service', async () => {
    const res: any = await request(app)
      .get('/api/')
    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('message')
  })
  it('should return 404 for invalid endpoints', async () => {
    const res: any = await request(app)
      .get('/some-random-endpoint/')
    expect(res.statusCode).toEqual(404)
    expect(res.body).toHaveProperty('message')
  })
})
