const db = require('../data/dbConfig');

module.exports = {
  find,
  findById,
  add,
  update,
  remove
};

function find() {
  return db('dogs');
};

function findById(id) {
  return db('dogs').where({ id }).first();
};

function add(dog) {
  if (dog) {
    return db('dogs').insert(dog)
    .then(ids => {
      return findById(ids[0]);
    });
  } else {
    return 'Error, you must add dog information'
  };
};

function update(id, changes) {
  return db('dogs').update(changes).where({ id })
    .then(count => {
      if (count > 0) {
        return findById(id);
      };
    });
};

function remove(id) {
  return db('dogs').where({ id }).del();
}