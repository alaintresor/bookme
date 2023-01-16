import chai from 'chai';
import chaiHttp from 'chai-http';

chai.use(chaiHttp);
const api = chai.request(server).keepOpen();
const { expect } = chai;
import server from '../src/app.js';

describe('User notification', () => {
  const created = 201;
  const success = 200;
  let newToken;

  it('Should return 201', (done) => {
    const user = {
      firstName: 'Eddy',
      lastName: 'Uwambaje',
      username: 'leftie1',
      email: 'leftie1@gmail.com',
      password: 'uwambaje',
      repeat_password: 'uwambaje',
      phoneNumber: '0785058050',
      role: 'requester',
    };

    api
      .post('/api/v1/user/auth/signup')
      .send(user)
      .end((err, res) => {
        newToken = res.body.token;
        expect(res.status).to.equal(created);
        expect(newToken);
        done();
      });
  });
  it('Get all notifications', (done) => {
    api
      .get('/api/v1/user/notification/get')
      .set('Authorization', `Bearer ${newToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(success);
        done();
      });
  });
  it('Read single notification', (done) => {
    api
      .patch(`/api/v1/user/notification/${1}`)
      .set('Authorization', `Bearer ${newToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(success);
        done();
      });
  });
  it('Read all notifications', (done) => {
    api
      .put('/api/v1/user/notification/read')
      .set('Authorization', `Bearer ${newToken}`)
      .end((err, res) => {
        expect(res.status).to.equal(success);
        done();
      });
  });
});
