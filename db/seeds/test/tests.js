const teams = require('../../../utilities/test-data.js');

const createTrainer = (knex, trainer) => {
  return knex('trainers').insert({
    name: trainer.name,
    level: trainer.level
  }, 'id')
    .then(trainerId => {
      let pokemonPromises = [];

      pokemonPromises.push(createPokemonTeam(knex, {
        pokemon_one: trainer.pokemon[0],
        pokemon_two: trainer.pokemon[1],
        pokemon_three: trainer.pokemon[2],
        pokemon_four: trainer.pokemon[3],
        pokemon_five: trainer.pokemon[4],
        trainer_id: trainerId[0]
      })
      );
      return Promise.all(pokemonPromises);
    });
};

const createPokemonTeam = (knex, pokemon) => {
  return knex('pokemon').insert(pokemon);
};

exports.seed = (knex, Promise) => {
  return knex('pokemon').del()
    .then(() => knex('trainers').del())
    .then(() => {
      let pokemonPromises = [];

      teams.forEach(team => {
        pokemonPromises.push(createTrainer(knex, team));
      });
      return Promise.all(pokemonPromises);
    })
    .catch(error => console.log(`Error seeding data ${error}`));
};
