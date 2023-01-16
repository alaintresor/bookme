import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../src/app.js';
import db from '../src/database/models/index.js';
const rooms = db['locations'];

chai.should();
chai.use(chaiHTTP);
const api = chai.request(app).keepOpen();
const { expect } = chai;

describe('POST api/v1/location/create', () => {
  const location = {
    locationName: 'Rwamagana,Rwanda',
  };
  const locationUpdate = {
    locationName: 'Rwamagana,Rwanda',
  };
  let newToken;
  it('Should return 201', (done) => {
    const user = {
      firstName: 'Edd',
      lastName: 'Uwambaje12345',
      username: 'Edd5432101',
      email: 'uwambaqje12301@gmail.com',
      password: 'uwambaje',
      repeat_password: 'uwambaje',
      phoneNumber: '0785058050',
      role: 'travel admin',
    };

    api
      .post('/api/v1/user/auth/signup')
      .send(user)
      .end((err, res) => {
        const { token } = res.body;
        newToken = token;
        return done();
      });
  });

  it('should create a location ', (done) => {
    api
      .post('/api/v1/location/create')
      .set('Authorization', `Bearer ${newToken}`)
      .send(location)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        return done();
      });
  });

  it('Should delete location according to id', (done) => {
    const locationId = 2;
    api
      .delete('/api/v1/location/' + locationId)
      .set('Authorization', `Bearer ${newToken}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        return done();
      });
  });
  it('Should delete location according to id', (done) => {
    const locationId = '';
    api
      .delete('/api/v1/location/' + locationId)
      .set('Authorization', `Bearer ${newToken}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        return done();
      });
  });

  describe('update /api/v1/location', () => {
    const locationId = 1;
    it('Should update location according to id', (done) => {
      api
        .put('/api/v1/location/' + locationId)
        .set('Authorization', `Bearer ${newToken}`)
        .send(locationUpdate)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('message');
          return done();
        });
    });
  });
});
describe('GET API /api/v1/location', () => {
  it('should get all location', (done) => {
    chai
      .request(app)
      .get('/api/v1/location')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        return done();
      });
  });
});
describe('GET API /api/v1/location', () => {
  const id = 1;
  it('should get single location', (done) => {
    chai
      .request(app)
      .get('/api/v1/location/' + id)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        return done();
      });
  });
});
