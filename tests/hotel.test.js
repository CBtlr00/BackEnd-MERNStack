const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

describe('Hotels API', () => {
  beforeAll(async () => {
    await mongoose.connect(process.env.MONGO, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    await mongoose.disconnect();
  });

  afterEach(async () => {
    await Hotel.deleteMany();
    await Room.deleteMany();
  });

  describe('POST /hotels', () => {
    test('should create a new hotel', async () => {
      const res = await request(app)
        .post('/hotels')
        .send({
          name: 'Test Hotel',
          type: 'hotel',
          city: 'Test City',
          address: '123 Test Street',
          distance: '10 km',
          photos: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
          title: 'Test Hotel',
          desc: 'This is a test hotel.',
          rating: 4,
          rooms: [],
          cheapestPrice: 100,
          featured: true,
        })
        .expect(200);

      expect(res.body.name).toBe('Test Hotel');
      expect(res.body.type).toBe('hotel');
      expect(res.body.city).toBe('Test City');
      expect(res.body.address).toBe('123 Test Street');
      expect(res.body.distance).toBe('10 km');
      expect(res.body.photos).toHaveLength(2);
      expect(res.body.title).toBe('Test Hotel');
      expect(res.body.desc).toBe('This is a test hotel.');
      expect(res.body.rating).toBe(4);
      expect(res.body.rooms).toHaveLength(0);
      expect(res.body.cheapestPrice).toBe(100);
      expect(res.body.featured).toBe(true);
    });
  });

});
