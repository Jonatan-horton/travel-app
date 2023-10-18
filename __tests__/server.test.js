const app = require('../src/server/server.js');
const supertest = require('supertest');
const request = supertest(app);

it('gets the test endpoint', async done => {
    const res = await request.get('/testEndpoint');
  
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('The endpoint test passed!');
    done()
  })