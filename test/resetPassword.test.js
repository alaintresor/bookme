import dotenv from 'dotenv';
import chai, { expect, request, use } from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app';
import models from '../src/database/models';

dotenv.config();

const { Users } = models;
chai.should();
use(chaiHttp);

const userEmail = {
  email: 'hishamunda221015883@gmail.com',
};

const wrongUserEmail = {
  email: 'wrongdemouser@gmail.com',
};

const invalidUserEmail = {
  email: 'wrongdemouser@bravo',
};

const userPassword = {
  password: 'updated@Pass123',
};

const invalidUserPassword = {
  password: 'updated',
};

let emailToken;

describe('Password Reset Testing', () => {
  it('It Should Request For A Password Reset', async () => {
    const res = await request(server)
      .post('/api/v1/user/forgotpassword')
      .send(userEmail);
    expect(res).to.have.status(404);
  });

  it('It Should Throw A Not Found Error When User Enters Invalid Credentials', async () => {
    const res = await request(server)
      .post('/api/v1/user/forgotpassword')
      .send(wrongUserEmail);
    expect(res).to.have.status(404);
  });

  it('It Should Reject Password Reset With Invalid Token', async () => {
    const newEmailToken = emailToken + 'bad';
    const res = await request(server)
      .patch(`/api/v1/user/resetpassword?token=${newEmailToken}`)
      .send(userPassword);
  });
});
