const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../..');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Integration Tests for airRoutes', () => {
  it('should get the most polluted data', (done) => {
    chai
      .request(app)
      .get('/mostpolluted')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('Result');
        expect(res.body.Result).to.have.property('pollution');
        expect(res.body.Result).to.have.property('date');
        done();
      });
  });
});