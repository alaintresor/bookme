import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../src/app.js';
import db from '../src/database/models/index.js';
const rooms = db['accomodations'];

chai.should();
chai.use(chaiHTTP);
const api = chai.request(app).keepOpen();
const { expect } = chai;

describe('POST api/v1/accomodations/', () => {
  const accomodation = {
    name: 'marriot',
    description: 'name',
    locationId: 1,
    image: 'url://',
    geoLocation: '234',
    highlight: 'simple',
    amenitiesList: ['televisions'],
  };
  const accomodationP = {
    name: '',
    description: '123',
  };
  const accomodation1 = {
    name: 'marriot',
    description: 'name',
    locationId: 1,
    image: 'images',
    geoLocation: '234',
    highlight: 'simple',
    amenitiesList: ['placide'],
  };
  const accomodationLocation = {
    name: 'marriot',
    description: 'name',
    locationId: 10000000000000,
    image: 'images',
    geoLocation: '234',
    highlight: 'simple',
    amenitiesList: ['placide'],
  };

  let newToken;
  let newToken1;

  it('Should return 201', (done) => {
    const user = {
      firstName: 'Eddy',
      lastName: 'Uwambaje',
      username: 'Eddy5423',
      email: 'uwambaqje5423@gmail.com',
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
        done();
      });
  });
  it('Should return 201', (done) => {
    const user1 = {
      firstName: 'Eddy',
      lastName: 'Uwambaje',
      username: 'Eddy543',
      email: 'uwambaqje543@gmail.com',
      password: 'uwambaje',
      repeat_password: 'uwambaje',
      phoneNumber: '0785058050',
      role: 'requester',
    };

    api
      .post('/api/v1/user/auth/signup')
      .send(user1)
      .end((err, res) => {
        const { token } = res.body;
        newToken1 = token;
        done();
      });
  });

  it('should create an accomodation ', (done) => {
    api
      .post('/api/v1/accomodation')
      .set('Authorization', `Bearer ${newToken}`)
      .send(accomodation)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        done();
      });
  });
  it('should not create an accomodation through LocationId not found', (done) => {
    api
      .post('/api/v1/accomodation')
      .set('Authorization', `Bearer ${newToken}`)
      .send(accomodationLocation)
      .end((err, res) => {
        expect(res.status).to.be.equal(404);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });

  it('should not create an accomodation with error ', (done) => {
    api
      .post('/api/v1/accomodation')
      .set('Authorization', `Bearer ${newToken}`)
      .send(accomodationP)
      .end((err, res) => {
        expect(res.status).to.be.equal(500);

        done();
      });
  });

  it('should not create an accomodation with wrong token', (done) => {
    api
      .post('/api/v1/accomodation')
      .set('Authorization', `Bearer ${newToken1}`)
      .send(accomodation)
      .end((err, res) => {
        expect(res.status).to.be.equal(403);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        done();
      });
  });
  describe('delete api /api/v1/accomodation', () => {
    const roomId = 1;
    it('Should delete accomodation according to id', (done) => {
      chai
        .request(app)
        .delete('/api/v1/accomodation/' + roomId)
        .set('Authorization', `Bearer ${newToken}`)
        .send()
        .end((err, res) => {
          if (err) return done(err);
          expect(res).to.have.status(200);
          return done();
        });
    });
  });
  describe('update /api/v1/accomodation/', () => {
    const accomodatiomId = 1;
    it('Should update accomodation according to id', (done) => {
      api
        .put('/api/v1/accomodation/' + accomodatiomId)
        .set('Authorization', `Bearer ${newToken}`)
        .send(accomodation1)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message');
          return done();
        });
    });
  });
  describe('update /api/v1/accomodation/', () => {
    const accomodatiomId = 1;
    it('Should not update accomodation according to id', (done) => {
      api
        .put('/api/v1/accomodation/' + accomodatiomId)
        .set('Authorization', `Bearer ${newToken1}`)
        .send(accomodation1)
        .end((err, res) => {
          expect(res).to.have.status(403);

          return done();
        });
    });
  });
});

describe('GET API /api/v1/accomodation', () => {
  it('should get all accomodation', (done) => {
    chai
      .request(app)
      .get('/api/v1/accomodation')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        expect(res.body).to.have.property('message');
        return done();
      });
  });
});

describe('GET API /api/v1/accomodation', () => {
  const id = 2;
  it('should get single accomodation', (done) => {
    chai
      .request(app)
      .get('/api/v1/accomodation/' + id)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('data');
        return done();
      });
  });
});
