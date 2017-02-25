var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

chai.use(chaiHttp);

var id;

describe('User functions', function() {
  it('should add a SINGLE user on /api/users POST', function(done) {
    chai.request(server)
      .post('/api/users')
      .send({
        'name': 'Ted Moseby',
        'email': 'tmose@gmail.com',
        'password': 'foobar'
      }).end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success');
        res.body.success.should.equal(true);
        res.body.user.should.have.property('_id');
        id = res.body.user._id;
        done();
      });
  });

  it('should delete user on /api/users/:id DELETE', function(done) {
    chai.request(server)
      .delete('/api/users/' + id)
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('success');

        done();
      });
  });
});
