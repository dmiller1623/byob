var assert = require('assert');
const chai = require('chai');
var should = chai.should();
const chaiHttp = require('chai-http');
const { app, database } = require('../server')

chai.use(chaiHttp)

describe('api routes', () => {
  beforeEach((done) => {
    database.migrate.rollback()
    .then(() => {
      database.migrate.rollback()
    })
    .then(() => {
      database.migrate.latest()
      .then(() => {
        return database.seed.run()
          .then(() => {
            done();
          })
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
      response.body.length.should.equal(29);
      response.body[0].should.have.property('name')
      response.body[0].name.should.equal('kiel')
      response.body[0].should.have.property('level')
      response.body[0].level.should.equal(50)
      done();
    })
  })

  it('api/v1/pokemon should return an array with pokemon', (done) => {
    chai.request(app)
    .get('/api/v1/pokemon')
    .end((err, response) => {
      response.should.have.status(200)
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.equal(29);
      response.body[0].should.have.property('trainer_id')
      response.body[0].trainer_id.should.equal(1)
      response.body[0].should.have.property('pokemon_one')
      response.body[0].pokemon_one.should.equal('Charizard')
      response.body[0].should.have.property('pokemon_two')
      response.body[0].pokemon_two.should.equal('Dragonite')
      response.body[0].should.have.property('pokemon_three')
      response.body[0].pokemon_three.should.equal('Blastoise')
      response.body[0].should.have.property('pokemon_four')
      response.body[0].pokemon_four.should.equal('Alakazam')
      response.body[0].should.have.property('pokemon_five')
      response.body[0].pokemon_five.should.equal('Mewtwo')
      done()
    })
  })

  it('api/vi/trainers/:id should return a specific trainer', (done) => {
    chai.request(app)
    .get('/api/v1/trainers/3')
    .end((err, response) => {
      response.should.have.status(200)
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.equal(1);
      response.body[0].should.have.property('id')
      response.body[0].id.should.equal(3)
      response.body[0].should.have.property('name')
      response.body[0].name.should.equal('jesse')
      response.body[0].should.have.property('level')
      response.body[0].level.should.equal(50)
      done()
    })
  })

  it('api/v1/pokemon/:id should return a specific pokemon team', (done) => {
    chai.request(app)
    .get('/api/v1/pokemon/10')
    .end((err, response) => {
      response.should.have.status(200)
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.equal(1);
      response.body[0].should.have.property('trainer_id')
      response.body[0].trainer_id.should.equal(10)
      response.body[0].should.have.property('pokemon_one')
      response.body[0].pokemon_one.should.equal('Pikachu')
      response.body[0].should.have.property('pokemon_two')
      response.body[0].pokemon_two.should.equal('Mew')
      response.body[0].should.have.property('pokemon_three')
      response.body[0].pokemon_three.should.equal('Gyrados')
      response.body[0].should.have.property('pokemon_four')
      response.body[0].pokemon_four.should.equal('Abra')
      response.body[0].should.have.property('pokemon_five')
      response.body[0].pokemon_five.should.equal('Pidgey')
      done()
    })
  })

  it.only('should add a trainer to the database', (done) => {
    chai.request(app)
    .post('/api/v1/trainers')
    .send({
      name: "ronald",
      level: 1
    })
    .end((err, response) => {
      response.should.have.status(201)
      response.body.should.have.property('id')
      response.body.id.should.equal(30)
      done()
    })
  })

  describe('client routes', () => {
    it('should return a happy path', (done) => {
      chai.request(app)
      .get('/')
      .end((err, response) => {
        response.should.have.status(200)
        done()
      })
    })

    it('should return the unhappy path', (done) => {
      chai.request(app)
      .get('/knscklnsd')
      .end((err, response) => {
        response.should.have.status(404)
        done()
      })
    })
  })
})