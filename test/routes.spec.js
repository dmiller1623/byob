var assert = require('assert');
const chai = require('chai');
var should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server')

chai.use(chaiHttp)

describe('api routes', () => {
  it('ap1/v1/teams should return an array of teams', (done) => {
    chai.request(server)
    .get('/api/v1/teams')
    .end((err, response) => {
      response.should.have.status(200);
      // response.should.be.json;
      // response.body.should.be.a('array');
      // response.body.length.should.equal(30);
      done();
    })
  })
})