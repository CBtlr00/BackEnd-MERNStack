const request = require('supertest');
const app = require('../app');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

describe('POST /api/auth/register', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    });
  });

  afterAll(async () => {
    await User.deleteMany({});
    await mongoose.connection.close();
  });

  it('should register a new user', async () => {
    const user = {
      username: 'testuser',
      password: 'testpassword',
      email: 'testuser@example.com',
      name: 'Test User',
    };

    const res = await request(app)
      .post('/api/auth/register')
      .send(user)
      .expect(200);

    expect(res.text).toEqual('User has been created.');

    const registeredUser = await User.findOne({ username: 'testuser' });

    expect(registeredUser).not.toBeNull();

    const isPasswordCorrect = await bcrypt.compare(
      'testpassword',
      registeredUser.password
    );
    expect(isPasswordCorrect).toBe(true);
  });
});