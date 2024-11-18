// server.test.js
const request = require('supertest');
const app = require('./server');  // We will export app in the server.js

describe('GET /uptime', () => {
  it('should return system uptime', async () => {
    const response = await request(app).get('/uptime');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('uptime');
  });
});

describe('GET /cpu', () => {
  it('should return CPU usage', async () => {
    const response = await request(app).get('/cpu');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('cpuUsage');
  });
});
