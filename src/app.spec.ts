import request from 'supertest';

const baseUrl = 'http://localhost:3300/';

describe('Health Check', () => {
  it('should return a 200 status code with OK ', async () => {
    const response = await request(baseUrl).get('health');
    const { state, message } = response.body;
    expect(state).toBe('OK');
    expect(message).toBe('Server is up and running');
    expect(response.status).toBe(200);
  });
});
