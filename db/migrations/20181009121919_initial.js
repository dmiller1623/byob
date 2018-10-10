
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('trainers', function(table) {
      table.increments('id').primary();
      table.string('name');
      table.integer('level');

      table.timestamps(true, true)
    }),

    knex.schema.createTable('pokemon', function(table) {
      table.increments('id').primary();
      table.integer('trainer_id').unsigned()
      table.foreign('trainer_id').references('trainers.id');
      table.string('pokemon_one');
      table.string('pokemon_two');
      table.string('pokemon_three');
      table.string('pokemon_four');
      table.string('pokemon_five');

      table.timestamps(true, true)
    })
  ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
    knex.schema.dropTable('trainers'),
    knex.schema.dropTable('pokemon')
  ])
};
