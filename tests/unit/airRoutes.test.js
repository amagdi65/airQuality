const chai = require('chai');
const chaiHttp = require('chai-http');
const { app } = require('../..');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Unit Tests for airRoutes', () => {
  it('should get air quality data by providing latitude and longitude', (done) => {
    chai
      .request(app)
      .get('/airquality/48.856613/2.352222')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('Result');
        expect(res.body.Result).to.have.property('pollution');
        done();
      });
  });
});