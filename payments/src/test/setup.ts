import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import { app } from '../app';
import jwt from 'jsonwebtoken';

declare global {
  namespace NodeJS {
    interface Global {
      signin(id?: string): string[];
    }
  }
}

jest.mock('../nats-wrapper.ts');

process.env.STRIPE_KEY =
  'sk_test_51HCPhEG0sixEZsUeoTgUfICwqGHugEf2wVc4nkL4XvI4sDO5IfqbNPaw8Hmxu8BtCWGFcV74jBJLwwrvhhGZ7Rfx0092AZelWl';

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = 'asdfasdf';
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  mongo = new MongoMemoryServer();
  const mongoUri = await mongo.getUri();

  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  jest.clearAllMocks();
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

global.signin = (id?: string) => {
  // Build a JWT payload { id, email }
  const payload = {
    id: id || new mongoose.Types.ObjectId().toHexString(),
    email: 'test@gmail.com',
  };
  // Create the JWT
  const token = jwt.sign(payload, process.env.JWT_KEY!);
  // Build session Object { jwt: MY_JWT }
  const session = { jwt: token };
  // Turn session into JSON
  const sessionJSON = JSON.stringify(session);
  // Take JSON and encode it as base64
  const base64 = Buffer.from(sessionJSON).toString('base64');
  // Return a string that's the cookie with encoded data
  return [`express:sess=${base64}`];
};
