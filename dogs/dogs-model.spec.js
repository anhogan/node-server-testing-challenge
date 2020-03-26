const Dogs = require('./dogs-model');
const db = require('../data/dbConfig');

beforeEach(async () => {
  await db.seed.run();
});

describe('Find all Dogs', () => {
  it.todo('Returns a list of all dogs');
});

describe('Find dog by ID', () => {
  it.todo('Returns one dog based if ID is valid');

  it.todo('Will return null if ID is invalid');
});

describe('Add a dog', () => {
  it.todo('Adds a dog to the database');

  it.todo('Will return null if no name is entered');
});

describe('Update a dog', () => {
  it.todo('Updates a dog in the database');

  it.todo('Will return null if the ID is invalid');
});

describe('Delete a dog', () => {
  it.todo('Deletes a dog from the database');

  it.todo('Will return 0 if the ID is invalid');
});