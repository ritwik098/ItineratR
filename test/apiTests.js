var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

var amadeus = require('../utils/amadeus');
var gmaps = require('../utils/googleMaps');
var yelp = require('../utils/yelp');

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

describe('Google Places API functions', function() {
  it('should get points of interest', function(done) {
    this.timeout(5000);
    gmaps.getPointsOfInterest({ cityName: "New York" }, function(err, body) {
      body.should.be.a('object');
      body.should.have.property('results');
      done();
    })
  });

  it('should get coordinates based on an address', function(done) {
    this.timeout(10000);
    gmaps.getCoordinates('Barrington', function(err, coords) {
      console.log(coords);
      coords.should.be.a('object');
      coords.should.have.property('lat');
      coords.should.have.property('lng');
      done();
    });
  });

  it('should fail on a coordinate with an invalid address', function(done) {
    this.timeout(5000);
    gmaps.getCoordinates('fdksal;feioafkld;ska', function(err, coords) {
      err.should.be.a('object');
      err.message.should.equal('Location not found');
      done();
    });
  });

  it('should get yelp recommendations', function(done) {
    this.timeout(5000);
    yelp.getResturaunts({
      term: 'Lunch',
      location: 'New York City'
    }, function(err, body) {
      console.log(body);
      done();
    });
  });
});
