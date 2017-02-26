var chai = require('chai');
var should = chai.should();

var schedule = require('../utils/scheduler').schedule;

describe('Scheduler', function() {
  it('should create a schedule for New York', function(done) {
    this.timeout(7000);
    var now = new Date();
    var then = new Date();
    then.setDate(then.getDate() + 3);
    schedule(now, then, 'New York City', function(err, body) {
      console.log(err);
      console.log(body);
      body.should.be.a('array');
      done();
    });
  });
});
