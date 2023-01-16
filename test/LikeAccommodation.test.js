import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../src/app.js';

chai.should();
chai.use(chaiHTTP);
const api = chai.request(app).keepOpen();
const { expect } = chai;

describe('Like/Unlike accommodation', () => {
  const user = {
    firstName: 'Eddy',
    lastName: 'Uwambaje',
    username: 'Eddy913',
    email: 'uwambaqje913@gmail.com',
    password: 'uwambaje',
    repeat_password: 'uwambaje',
    phoneNumber: '0785058050',
    role: 'requester',
  };
  const user2 = {
    firstName: 'Eddy',
    lastName: 'Uwambaje',
    username: 'Eddy914',
    email: 'uwambaqje914@gmail.com',
    password: 'uwambaje',
    repeat_password: 'uwambaje',
    phoneNumber: '0785058050',
    role: 'requester',
  };

  it('Should return 200 for success', (done) => {
    api
      .post('/api/v1/user/auth/signup')
      .send(user)
      .end((err, res) => {
        const { token } = res.body;
        api
          .put('/api/v1/accomodation/like/2')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            const { message } = res.body;
            expect(res.status).to.equal(200);
            expect(message).to.equal('accommodation liked');
            done();
          });
      });
  });
  it('Should return 400 for unavailable accommodation id', (done) => {
    api
      .post('/api/v1/user/auth/signup')
      .send(user2)
      .end((err, res) => {
        const { token } = res.body;
        api
          .put('/api/v1/accomodation/like/00')
          .set('Authorization', `Bearer ${token}`)
          .end((err, res) => {
            const { message } = res.body;
            expect(res.status).to.equal(400);
            expect(message).to.equal('Accommodation not found');
            done();
          });
      });
  });
  it('Should return 401 for unauthorization', (done) => {
    api.put('/api/v1/accomodation/like/00').end((err, res) => {
      const { message } = res.body;
      expect(res.status).to.equal(401);
      expect(message).to.equal(
        'You are not logged in! please login to get access',
      );
      done();
    });
  });
});
