import chai from 'chai';
import chaiHTTP from 'chai-http';
import app from '../src/app.js';

import db from '../src/database/models/index.js';
const users = db['users'];

chai.should();
chai.use(chaiHTTP);

const cleanAlltables = async () => {
  await users.destroy({ where: {} });
};

const user = {
  firstName: 'Eddy',
  lastName: 'Uwambaje',
  username: 'Eddy',
  email: 'uwambaqje1@gmail.com',
  password: 'uwambaje',
  repeat_password: 'uwambaje',
  phoneNumber: '0785058050',
  role: 'requester',
};
const superAdmin = {
  firstName: 'Eddy',
  lastName: 'Uwambaje',
  username: 'superadmin',
  email: 'superadmin@gmail.com',
  password: 'uwambaje',
  repeat_password: 'uwambaje',
  phoneNumber: '0785058050',
  role: 'super admin',
};
describe('Setting users roles', () => {
  before(async () => {
    await cleanAlltables();
  });

  it('It should update the user role', (done) => {
    const requestBody = {
      email: 'uwambaqje1@gmail.com',
      role: 'manager',
    };

    chai
      .request(app)
      .post('/api/v1/user/auth/signup')
      .send(user)
      .end((err, res) => {});

    let token;
    chai
      .request(app)
      .post('/api/v1/user/auth/signup')
      .send(superAdmin)
      .end((err, res) => {
        token = res.body.token;
        chai
          .request(app)
          .put('/api/v1/user/roles')
          .set('Authorization', `Bearer ${token}`)
          .send(requestBody)
          .end((err, res) => {
            res.should.have.status(200);
            done();
          });
      });
  });
  it('It should return User not found', (done) => {
    const requestBody = {
      email: 'janedoeee@email.com',
      role: 'requester',
    };
    let token;
    chai
      .request(app)
      .post('/api/v1/user/auth/signup')
      .send(superAdmin)
      .end((err, res) => {
        token = res.body.token;
        chai
          .request(app)
          .put('/api/v1/user/roles')
          .set('Authorization', `Bearer ${token}`)
          .send(requestBody)
          .end((err, res) => {
            res.should.have.status(404);
            done();
          });
        done();
      });
  });
  it('It should return invalid token', (done) => {
    const requestBody = {
      email: 'janedoe@email.com',
      role: 'manager',
    };
    chai
      .request(app)
      .put('/api/v1/user/roles')
      .set('token', 'loremipsum')
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('It should return Not Authorized', (done) => {
    const requestBody = {
      email: 'janedoe@gmail.com',
      role: 'requester',
    };
    chai
      .request(app)
      .put('/api/v1/user/roles')
      // .set('token', requesterToken)
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
  it('It should return Not Authenticated', (done) => {
    const requestBody = {
      email: 'janedoe@gmail.com',
      role: 'manager',
    };
    chai
      .request(app)
      .put('/api/v1/user/roles')
      .set('token', '')
      .send(requestBody)
      .end((err, res) => {
        res.should.have.status(401);
        done();
      });
  });
});
