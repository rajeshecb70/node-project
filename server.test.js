// server.test.js
const request = require('supertest');
const app = require('./server');  // Import the app
const server = require('./server').server;  // Import the server instance

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

// Close the server after all tests are done
afterAll(() => {
  server.close(); // Properly close the server instance
});
