var assert = require('assert');
const chai = require('chai');
var should = chai.should();
const chaiHttp = require('chai-http');
const { app, database } = require('../server');

chai.use(chaiHttp);

describe('api routes', () => {
  beforeEach((done) => {
    database.migrate.rollback()
      .then(() => {
        database.migrate.latest()
          .then(() => {
            return database.seed.run()
              .then(() => {
                done();
              });
          });
      });
  });

  it('ap1/v1/trainers should return an array of trainers', (done) => {
    chai.request(app)
      .get('/api/v1/trainers')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);

        const foundTrainer = response.body.find(trainer => {
          return trainer.name === 'kiel';
        });

        foundTrainer.should.have.property('name');
        foundTrainer.name.should.equal('kiel');
        foundTrainer.should.have.property('level');
        foundTrainer.level.should.equal(50);
        done();
      });
  });

  it('api/v1/trainersss should return an error message', (done) => {
    chai.request(app)
      .get('/api/v1/trainerss')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });

  it('/api/v1/trainers?level=49 should return the trainers with the level specified', (done) => {
    chai.request(app)
      .get('/api/v1/trainers?level=49')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('dennis');
        response.body[0].should.have.property('level');
        response.body[0].level.should.equal(49);
      });
    done();
  });

  it('/api/v1/trainers?level=999 should return an error if no trainers are found at that level', () => {
    chai.request(app)
      .get('/api/v1/trainers?level=999')
      .end((err, response) => {
        response.should.have.status(404);
      });
  });

  it('api/v1/pokemon should return an array with pokemon', (done) => {
    chai.request(app)
      .get('/api/v1/pokemon')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);

        const foundPokemonTeam = response.body.find(team => {
          return team.trainer_id === 1;
        });

        foundPokemonTeam.should.have.property('trainer_id');
        foundPokemonTeam.trainer_id.should.equal(1);
        foundPokemonTeam.should.have.property('pokemon_one');
        foundPokemonTeam.pokemon_one.should.equal('Charizard');
        foundPokemonTeam.should.have.property('pokemon_two');
        foundPokemonTeam.pokemon_two.should.equal('Dragonite');
        foundPokemonTeam.should.have.property('pokemon_three');
        foundPokemonTeam.pokemon_three.should.equal('Blastoise');
        foundPokemonTeam.should.have.property('pokemon_four');
        foundPokemonTeam.pokemon_four.should.equal('Alakazam');
        foundPokemonTeam.should.have.property('pokemon_five');
        foundPokemonTeam.pokemon_five.should.equal('Mewtwo');
        done();
      });
  });

  it('api/v1/pokemonss should return an error message', (done) => {
    chai.request(app)
      .get('/api/v1/pokemons')
      .end((err, resposne) => {
        resposne.should.have.status(404);
        done();
      });
  });

  it('api/vi/trainers/:id should return a specific trainer', (done) => {
    chai.request(app)
      .get('/api/v1/trainers/3')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);

        const foundTrainer = response.body.find(trainer => {
          return trainer.name === 'jesse';
        });

        foundTrainer.should.have.property('id');
        foundTrainer.id.should.equal(3);
        foundTrainer.should.have.property('name');
        foundTrainer.name.should.equal('jesse');
        foundTrainer.should.have.property('level');
        foundTrainer.level.should.equal(50);
        done();
      });
  });

  it('api/v1/trainers/id should return an error message if trainer is not found', (done) => {
    chai.request(app)
      .get('/api/v1/trainers/100')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });

  it('api/v1/pokemon/:id should return a specific pokemon team', (done) => {
    chai.request(app)
      .get('/api/v1/pokemon/3')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(1);

        const foundTeam = response.body.find(team => {
          return team.pokemon_one === 'Electabuzz';
        });

        foundTeam.should.have.property('pokemon_one');
        foundTeam.pokemon_one.should.equal('Electabuzz');
        foundTeam.should.have.property('pokemon_two');
        foundTeam.pokemon_two.should.equal('Magmar');
        foundTeam.should.have.property('pokemon_three');
        foundTeam.pokemon_three.should.equal('Nidoran');
        foundTeam.should.have.property('pokemon_four');
        foundTeam.pokemon_four.should.equal('Nidoqueen');
        foundTeam.should.have.property('pokemon_five');
        foundTeam.pokemon_five.should.equal('Nidoking');
        done();
      });
  });

  it('/api/v1/pokemon/id should return an error if the team is not found', (done) => {
    chai.request(app)
      .get('/api/v1/pokemon/200')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });

  it('should add a trainer to the database', (done) => {
    chai.request(app)
      .post('/api/v1/trainers')
      .send({
        name: "ronald",
        level: 1
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.have.property('id');
        response.body.id.should.equal(4);
        done();
      });
  });

  it('should return an error message if a required param is not inluded in the request', (done) => {
    chai.request(app)
      .post('/api/v1/trainers')
      .send({
        name: "rob"
      })
      .end((err, response) => {
        response.should.have.status(422);
        done();
      });
  });

  it('should add a team of pokemon assigned to a trainer', (done) => {
    chai.request(app)
      .post('/api/v1/pokemon')
      .send({
        trainer_id: 1,
        pokemon_one: "Geodude",
        pokemon_two: "Raichu",
        pokemon_three: "Electabuzz",
        pokemon_four: "Dratini",
        pokemon_five: "Dragonite"
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.have.property('id');
        response.body.id.should.equal(4);
        done();
      });
  });
  
  it('should return an error if a missing param is not provided', (done) => {
    chai.request(app)
      .post('/api/v1/pokemon')
      .send({
        trainer_id: 1,
        pokemon_one: "Geodude",
        pokemon_two: "Raichu",
        pokemon_three: "Electabuzz",
        pokemon_five: "Dragonite"
      })
      .end((err, response) => {
        response.should.have.status(422);
        done();
      });
  });

  it('should update the trainer name', (done) => {
    chai.request(app)
      .patch('/api/v1/trainers/1')
      .send({
        name: "bob"
      })
      .end((err, response) => {
        response.should.have.status(204);
        done();
      });
  });

  it('should update the trainer level', (done) => {
    chai.request(app)
      .patch('/api/v1/trainer-levels/1')
      .send({
        level: 10
      })
      .end((err, response) => {
        response.should.have.status(204);
        done();
      });
  });

  it('should delete a pokemon team', (done) => {
    chai.request(app)
      .delete('/api/v1/pokemon/1')
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it('should return an error if a team was not found and deleted', (done) => {
    chai.request(app)
      .delete('/api/v1/pokemon/100')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });

  it('should delete a pokemon team', (done) => {
    chai.request(app)
      .delete('/api/v1/trainers/1')
      .end((err, response) => {
        response.should.have.status(200);
        done();
      });
  });

  it('should return an error if a pokemon team was not found and deleted', (done) => {
    chai.request(app)
      .delete('/api/v1/pokemon/100')
      .end((err, response) => {
        response.should.have.status(404);
        done();
      });
  });

  describe('client routes', () => {
    it('should return a happy path', (done) => {
      chai.request(app)
        .get('/')
        .end((err, response) => {
          response.should.have.status(200);
          done();
        });
    });

    it('should return the unhappy path', (done) => {
      chai.request(app)
        .get('/knscklnsd')
        .end((err, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });
});