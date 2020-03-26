const Dogs = require('./dogs-model');
const db = require('../data/dbConfig');

beforeEach(async () => {
  await db.seed.run();
});

describe('Find all Dogs', () => {
  it('Returns a list of all dogs', async () => {
    const res = await Dogs.find();

    expect(res).toHaveLength(3);
    expect(res[0].name).toBe('Socks');
    expect(res[1].name).toBe('Jade');
    expect(res[2].name).toBe('Sparta');
  });
});

describe('Find dog by ID', () => {
  it('Returns one dog based if ID is valid', async () => {
    const res = await Dogs.findById(1);

    expect(res.name).toBe('Socks');
  });

  it('Will return undefined if ID is invalid', async () => {
    const res = await Dogs.findById(5);

    expect(res).toBeUndefined();
  });
});

describe('Add a dog', () => {
  it('Adds a dog to the database', async () => {
    const res = await Dogs.add({ name: "Striker" });

    expect(res.name).toBe('Striker');
    expect(res.id).toBe(4);
  });

  // it('Will return null if no name is entered', async () => {
  //   const res = await Dogs.add();
  //   console.log(res);

  //   expect(res).toThrow();
  // });
});

describe('Update a dog', () => {
  it('Updates a dog in the database', async () => {
    const res = await Dogs.update(2, { name: "Jaden" });

    expect(res.name).toBe('Jaden');
  });

  it('Will return undefined if the ID is invalid', async () => {
    const res = await Dogs.update(4, { name: "Barkley" });

    expect(res).toBeUndefined();
  });
});

describe('Delete a dog', () => {
  it('Deletes a dog from the database', async () => {
    await Dogs.remove(1);

    const res = await db('dogs').select();

    expect(res).toHaveLength(2);
  });

  it('Will return 0 if the ID is invalid', async () => {
    const res = await Dogs.remove(4);

    expect(res).toBe(0);
  });
});