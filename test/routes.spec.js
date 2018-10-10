var assert = require('assert');
const chai = require('chai');
var should = chai.should();
const chaiHttp = require('chai-http');
const {app, database} = require('../server')
const teams = require('../utilities/helper')


chai.use(chaiHttp)

describe('api routes', () => {
  beforeEach(() => {
    app.locals.teams = teams;
    // database.migrate.rollback()
    // .then(() => {
    //   database.migrate.rollback()
    // })
    // .then(() => {
    //   database.migrate.latest()
    //   .then(() => {
    //     return database.seed.run()
    //       .then(() => {
    //         done();
    //       })
    //   });
    // });
  });

  it('ap1/v1/teams should return an array of teams', (done) => {
    chai.request(app)
    .get('/api/v1/teams')
    .end((err, response) => {
      response.should.have.status(200);
      response.should.be.json;
      response.body.should.be.a('array');
      response.body.length.should.equal(29);
      done();
      response.body[0].should.have.property('name')
      response.body[0].name.should.equal('kiel')
      response.body[0].should.have.property('level')
      response.body[0].level.should.equal(50)
      response.body[0].should.have.property('pokemon')
      response.body[0].pokemon.should.be.a('array')
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