import chai from 'chai';
import chaiHttp from 'chai-http';
import db from '../src/database/models/index.js';

const User = db['users'];

chai.use(chaiHttp);
const api = chai.request(server).keepOpen();
const { expect } = chai;
import server from '../src/app.js';
const unProcessableEntity = 422;
const conflict = 409;
const created = 201;
const unAuthorized = 401;
const success = 200;

describe('User sign up', () => {
  it('Should return 422 for the password is greater than 8 long', (done) => {
    const user = {
      firstName: 'Eddy',
      lastName: 'Uwambaje',
      username: 'Eddy',
      email: 'uwambaqje1@gmail.com',
      password: 'uwambajeee',
      repeat_password: 'uwambajeee',
      phoneNumber: '0785058050',
      role: 'requester',
    };
    api
      .post('/api/v1/user/auth/signup')
      .send(user)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(unProcessableEntity);
        expect(message);
        done();
      });
  });
  it('Should return 422 for the email is invalid', (done) => {
    const user = {
      firstName: 'Eddy',
      lastName: 'Uwambaje',
      username: 'Eddy',
      email: 'uwambaqjegmailcom',
      password: 'uwambaje',
      repeat_password: 'uwambaje',
      phoneNumber: '0785058050',
      role: 'requester',
    };
    api
      .post('/api/v1/user/auth/signup')
      .send(user)
      .send(user)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(unProcessableEntity);
        expect(message);
        done();
      });
  });
  it('Should return 422 for the password is alphanumeric', (done) => {
    const user = {
      firstName: 'Eddy',
      lastName: 'Uwambaje',
      username: 'Eddy',
      email: 'uwambaqje@gmail.com',
      password: 'uwa1baje',
      repeat_password: 'uwa1baje',
      phoneNumber: '0785058050',
      role: 'requester',
    };
    api
      .post('/api/v1/user/auth/signup')
      .send(user)
      .send(user)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(unProcessableEntity);
        expect(message);
        done();
      });
  });

  it('Should return 201', (done) => {
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

    api
      .post('/api/v1/user/auth/signup')
      .send(user)
      .end((err, res) => {
        const { token } = res.body;
        expect(res.status).to.equal(created);
        expect(token);
        done();
      });
  });

  it('Should return 409 for the provided email or username exist', (done) => {
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
    api
      .post('/api/v1/user/auth/signup')
      .send(user)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(conflict);
        expect(message).to.equal('Email already taken!');
        done();
      });
  });
});
describe('User login', () => {
  it('Should login user', (done) => {
    const user = {
      email: 'test1@gmail.com',
      password: 'test1',
    };
    api
      .post('/api/v1/user/login')
      .send(user)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(success);
        expect(message);
        done();
      });
  });
  it('Should return 401 for the provided worng email or password ', (done) => {
    const user = {
      email: 'wrong@gmail.com',
      password: 'wrong',
    };
    api
      .post('/api/v1/user/login')
      .send(user)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(unAuthorized);
        expect(message);
        done();
      });
  });
  it('Should return 400 for the provided empty fields!', (done) => {
    const user = {};
    api
      .post('/api/v1/user/login')
      .send(user)
      .end((err, res) => {
        const { message } = res.body;
        expect(res.status).to.equal(400);
        expect(message);
        done();
      });
  });
});
describe('User logout', () => {
  const user = {
    firstName: 'Rose',
    lastName: 'Reine',
    username: 'Rose31',
    email: 'mwisemarierose@gmail.com',
    password: 'mwisenez',
    repeat_password: 'mwisenez',
    phoneNumber: '0780850683',
    role: 'requester',
  };

  it('Should return 201 on successful logout', (done) => {
    let token;
    api
      .post('/api/v1/user/auth/signup')
      .send(user)
      .end((err, res) => {
        const id = res.body.data.user.id;
        User.update(
          {
            isVerified: true,
          },
          { where: { id } },
        ).then((res) => {
          api
            .post('/api/v1/user/login')
            .send({ email: user.email, password: user.password })
            .end((err, res) => {
              const { token } = res.body;
              api
                .get('/api/v1/user/auth/logout')
                .set('Authorization', `Bearer ${token}`)
                .end((err, res) => {
                  expect(res.status).to.equal(200);
                  expect(res.body).to.have.property('message');
                  expect(res.body.message).to.equal(
                    'User logged out successfully',
                  );
                  done();
                });
            });
        });
      });
  });
});
