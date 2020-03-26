const request = require('supertest');

const server = require('./server');

const db = require('../data/dbConfig');

jest.setTimeout(30000);

beforeEach(async () => {
  await db.seed.run();
});

describe('GET Endpoint', () => {
  it('Returns a list of all dogs', async () => {
    const res = await request(server).get('/dogs');

    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body).toHaveLength(3);
  });
});

describe('POST Endpoint', () => {
  it('Adds a dog to the database', async () => {
    const res = await request(server).post('/dogs').send({ name: "Striker" });

    expect(res.statusCode).toBe(201);
    expect(res.body.name).toBe('Striker');
    expect(res.body.name).toHaveLength(7);
    expect(res.type).toBe('application/json');
  });

  it('Validates that a name is sent in the request body', async () => {
    const res = await request(server).post('/dogs').send({});

    expect(res.statusCode).toBe(400);
    expect(res.type).toBe('application/json');
    expect(res.body.name).toBeUndefined();
  });
});

describe('PUT Endpoint', () => {
  it('Updates a dog in the database', async () => {
    const res = await request(server).put('/dogs/2').send({ name: "Striker" });

    expect(res.statusCode).toBe(200);
    expect(res.body.name).toBe('Striker');
    expect(res.type).toBe('application/json');
  });

  it('Validates the dog ID', async () => {
    const res = await request(server).put('/dogs/4').send({ name: "Barkley" });

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/invalid dog id/i);
    expect(res.type).toBe('application/json');
    expect(res.body.name).toBeUndefined();
  });
});

describe('DELETE Endpoint', () => {
  it('Deletes a dog from the database', async () => {
    const res = await request(server).delete('/dogs/2');

    expect(res.statusCode).toBe(200);
    expect(res.type).toBe('application/json');
    expect(res.body).toHaveLength(2);
  });

  it('Validates the dog ID', async () => {
    const res = await request(server).delete('/dogs/4');

    expect(res.statusCode).toBe(404);
    expect(res.body.message).toMatch(/invalid dog id/i);
    expect(res.type).toBe('application/json');
    expect(res.body.name).toBeUndefined();
  });
});