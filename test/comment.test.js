import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../src/app';

import 'dotenv/config';

const { expect } = chai;
chai.use(chaiHttp);

const comment = {
  comment: 'Nice requests',
};

const user = {
  email: 'test1@gmail.com',
  password: 'test1',
};

describe('comment on trip requests', () => {
  it('should return 401 unauthorized.', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/trip/2/comment')
      .set('token', 'loggedout')
      .send(comment)
      .end((err, res) => {
        expect(res.status).to.equal(401);
        expect(res.body)
          .to.have.property('message')
          .that.equals('You are not logged in! please login to get access');
      });
    done();
  });

  let token;
  it('should return 201 on a successful comment on travel request', (done) => {
    // The travel request we'll comment on exists in the seed files, if you're wondering haha!
    // And the user we are logging in exists in the seed files too, if you're wondering again!
    chai
      .request(app)
      .post('/api/v1/user/login')
      .send(user)
      .end((err, res) => {
        token = res.body.token;
        chai
          .request(app)
          .post('/api/v1/user/trip/2/comment')
          .set('authorization', `Bearer ${token}`)
          .send(comment)
          .end((err, res) => {
            expect(res.status).to.equal(201);
            expect(res.body)
              .to.have.property('message')
              .that.equals('comment successfully added');
          });
        done();
      });
  });

  it('should return 400 on commenting to a trip request which does not exist', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/trip/88/comment')
      .set('authorization', `Bearer ${token}`)
      .send(comment)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body)
          .to.have.property('error')
          .that.equals(
            'The trip request you are trying to comment on does not exist!',
          );
      });
    done();
  });

  it('should return 200 on a successful fetch comments', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/trip/2/comments')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.property('message')
          .that.equals('Comments fetched successfully');
      });
    done();
  });

  it('should return 400 on fetch comments to a non-existing trip request', (done) => {
    chai
      .request(app)
      .get('/api/v1/user/trip/88/comments')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body)
          .to.have.property('error')
          .that.equals('That trip request does not exist!');
      });
    done();
  });

  it('should return 200 on a successful delete comment', (done) => {
    chai
      .request(app)
      .post('/api/v1/user/trip/2/comment')
      .set('authorization', `Bearer ${token}`)
      .send({
        id: 24,
        comment: 'create comment before deleting it!',
      })
      .end((err, res) => {
        expect(res.status).to.equal(201);
        expect(res.body)
          .to.have.property('message')
          .that.equals('comment successfully added');
      });
    chai
      .request(app)
      .delete('/api/v1/user/trip/comments/24/delete')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body)
          .to.have.property('message')
          .that.equals('Comment deleted successfully!');
      });
    done();
  });

  it('should return 400 on deleting a non-existing comment', (done) => {
    chai
      .request(app)
      .delete('/api/v1/user/trip/comments/88/delete')
      .set('authorization', `Bearer ${token}`)
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.body)
          .to.have.property('error')
          .that.equals('The comment you are trying to delete does not exist!');
      });
    done();
  });
});
