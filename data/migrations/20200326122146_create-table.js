
exports.up = function(knex, Promise) {
  return knex.schema.createTable('dogs', table => {
    table.increments();
    table.string('name', 255).unique().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('dogs');
};
