import request from 'supertest';
import app from '../app';

describe('login', () => {
  test('returns a 404 if the user is not found', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'nonexistentuser', password: 'password123' });
    expect(response.status).toBe(404);
  });

  test('returns a 400 if the password is incorrect', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'ADMIN', password: 'wrongpassword' });
    expect(response.status).toBe(400);
  });

  test('returns a 200 and a token if the login is successful', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({ username: 'ADMIN', password: '1234' });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('isAdmin');
    expect(response.headers['set-cookie']).toBeDefined();
  });
});
