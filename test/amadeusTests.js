var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

var amadeus = require('../utils/amadeus');

chai.use(chaiHttp);

describe('Amadeus API functions', function() {
  it('should get flight data', function(done) {
    this.timeout(5000);
    amadeus.flightSearch({
      origin: 'CHI'
    }, function(err, body) {
      body.should.be.a('object');
      body.should.have.property('origin');
      body.origin.should.equal('CHI');
      done();
    });
  });
});
