const request = require('supertest');

const server = require('./server');

const db = require('../data/dbConfig');

beforeEach(async () => {
  await db.seed.run();
});

describe('GET Endpoint', () => {
  it.todo('Returns a list of all dogs');

  it.todo('Returns 500 error if there is a server error');
});

describe('POST Endpoint', () => {
  it.todo('Adds a dog to the database');

  it.todo('Returns a 500 error if there is a server error');
});

describe('PUT Endpoint', () => {
  it.todo('Updates a dog in the database');

  it.todo('Returns a 500 error if the ID is invalid');
});

describe('DELETE Endpoint', () => {
  it.todo('Deleted a dog from the database');

  it.todo('Returns a 500 error if the ID is invalid');
});