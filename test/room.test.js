import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../src/app.js';
import db from '../src/database/models/index.js';
const rooms = db['rooms'];

chai.should();
chai.use(chaiHTTP);
const api = chai.request(app).keepOpen();
const { expect } = chai;

describe('POST api/v1/rooms/accomodationId', () => {
  const room = {
    roomType: 'twin',
    roomCost: '100$',
    roomDescription: 'lorem Ipsum',
  };
  const roomUpdate = {
    roomType: 'twin1',
    roomCost: '1000$',
    roomDescription: 'lorem Ipsum1',
  };
  let newToken;
  const accomodationId = 2;

  it('Should return 201', (done) => {
    const user = {
      firstName: 'Edd',
      lastName: 'Uwambaje12345',
      username: 'Edd54321',
      email: 'uwambaqje123@gmail.com',
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

  it('should create a room according to the accomodation id', (done) => {
    api
      .post('/api/v1/rooms/' + accomodationId)
      .set('Authorization', `Bearer ${newToken}`)
      .send(room)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
      });

    api
      .post('/api/v1/rooms/' + accomodationId)
      .set('Authorization', `Bearer ${newToken}`)
      .send(room)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
      });

    api
      .post('/api/v1/rooms/' + accomodationId)
      .set('Authorization', `Bearer ${newToken}`)
      .send(room)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
      });
    api
      .post('/api/v1/rooms/' + accomodationId)
      .set('Authorization', `Bearer ${newToken}`)
      .send(room)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
      });
    api
      .post('/api/v1/rooms/' + accomodationId)
      .set('Authorization', `Bearer ${newToken}`)
      .send(room)
      .end((err, res) => {
        expect(res.status).to.be.equal(201);
        done();
      });
  });

  it('Should delete room according to id', (done) => {
    const roomId = 2;
    api
      .delete('/api/v1/rooms/' + roomId)
      .set('Authorization', `Bearer ${newToken}`)
      .send()
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('status');
        expect(res.body).to.have.property('message');
        return done();
      });
  });
  describe('update /api/v1/rooms', () => {
    const roomId = 1;
    it('Should update room according to id', (done) => {
      api
        .put('/api/v1/rooms/' + roomId)
        .set('Authorization', `Bearer ${newToken}`)
        .send(roomUpdate)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('status');
          expect(res.body).to.have.property('message');
          return done();
        });
    });
  });
});
describe('GET API /api/v1/rooms', () => {
  it('should get all rooms', (done) => {
    chai
      .request(app)
      .get('/api/v1/rooms')
      .end((err, res) => {
        if (err) return done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        return done();
      });
  });
});
describe('GET API /api/v1/rooms', () => {
  const id = 1;
  it('should get single rooms', (done) => {
    chai
      .request(app)
      .get('/api/v1/rooms/' + id)
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.a('object');
        return done();
      });
  });
});
