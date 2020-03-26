
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('dogs').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('dogs').insert([
        {id: 1, name: 'Socks'},
        {id: 2, name: 'Jade'},
        {id: 3, name: 'Sparta'}
      ]);
    });
};
