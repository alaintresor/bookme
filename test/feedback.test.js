import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../src/app.js';
import db from '../src/database/models/index.js';

const User = db['users'];
const TripRequest = db['tripRequest'];

chai.use(chaiHttp);
const api = chai.request(server).keepOpen();
const { expect } = chai;

describe('User giving feedback to accomodation', (done) => {
  const user = {
    firstName: 'Rose',
    lastName: 'Reine',
    username: 'Rose56',
    email: 'gajunadeg@gmail.com',
    password: 'mwisenez',
    repeat_password: 'mwisenez',
    phoneNumber: '0780850683',
    role: 'requester',
  };
  const user1 = {
    firstName: 'Rose',
    lastName: 'Reine',
    username: 'Rose5',
    email: 'gajunade@gmail.com',
    password: 'mwisenez',
    repeat_password: 'mwisenez',
    phoneNumber: '0780850683',
    role: 'requester',
  };
  const user2 = {
    firstName: 'Rose',
    lastName: 'Reine',
    username: 'Rose',
    email: 'gajunad@gmail.com',
    password: 'mwisenez',
    repeat_password: 'mwisenez',
    phoneNumber: '0780850683',
    role: 'requester',
  };

  const tripRequest = {
    leavingFrom: 'musanze',
    goingTo: 1,
    travelDate: '2022-10-5',
    returnDate: '2022-11-6',
    travelReason: 'picnic',
    accomodationId: 1,
    roomId: 2,
  };
  const tripRequest1 = {
    leavingFrom: 'musanze',
    goingTo: 1,
    travelDate: '2022-10-5',
    returnDate: '2022-11-6',
    travelReason: 'picnic',
    accomodationId: 1,
    roomId: 1,
  };
  const tripRequest2 = {
    leavingFrom: 'musanze',
    goingTo: 1,
    travelDate: '2022-10-5',
    returnDate: '2022-11-6',
    travelReason: 'picnic',
    accomodationId: 1,
    roomId: 3,
  };

  it('Should return 401 for unauthorization', (done) => {
    api.get('/api/v1/feedback/getAll/:id').end((err, res) => {
      const { message } = res.body;
      expect(res.status).to.equal(401);
      expect(message).to.equal(
        'You are not logged in! please login to get access',
      );
      done();
    });
  });
  it('Should return 201 on successfully sent feedback', () => {
    let token;
    api
      .post('/api/v1/user/auth/signup')
      .send(user)
      .end((err, res) => {
        const id4 = res.body.data.user.id;
        User.update(
          {
            isVerified: true,
          },
          { where: { id4 } },
        ).then((res) => {
          api
            .post('/api/v1/user/login')
            .send({ email: user.email, password: user.password })
            .end((err, res) => {
              const { token } = res.body;
              api
                .post('/api/v1/user/trip')
                .set('Authorization', `Bearer ${token}`)
                .send(tripRequest)

                .end((err, res) => {
                  const tripId = 5;
                  TripRequest.update(
                    {
                      status: 'approved',
                      travelDate:
                        new Date(TripRequest.travelDate).getTime() -
                        24 * 60 * 60 * 1000,
                    },
                    { where: { id: tripId } },
                  ).then((result) => {
                    const feedback = {
                      feedback: 'very good',
                      accomodationId: tripId,
                    };
                    api
                      .post('/api/v1/feedback/sendFeedback')
                      .set('Authorization', `Bearer ${token}`)
                      .send(feedback)
                      .end((err, res) => {
                        expect(res.status).to.equal(201);
                        expect(res.body).to.have.property('message');
                        expect(res.body.message).to.equal(
                          'Feedback created successfully ✔',
                        );
                      });
                  });
                });
            });
        });
      });
  });

  it('should not give feedback on unapproved request', () => {
    let token;
    api
      .post('/api/v1/user/auth/signup')
      .send(user1)
      .end((err, res) => {
        const id1 = res.body.data.user.id;
        User.update(
          {
            isVerified: true,
          },
          { where: { id1 } },
        ).then((res) => {
          api
            .post('/api/v1/user/login')
            .send({ email: user1.email, password: user1.password })
            .end((err, res) => {
              const { token } = res.body;
              api
                .post('/api/v1/user/trip')
                .set('Authorization', `Bearer ${token}`)
                .send(tripRequest1)

                .end((err, res) => {
                  const tripId = 5;
                  TripRequest.update(
                    {
                      travelDate:
                        new Date(TripRequest.travelDate).getTime() -
                        24 * 60 * 60 * 1000,
                    },
                    { where: { id: tripId } },
                  ).then((result) => {
                    const feedback1 = {
                      feedback: 'good',
                      accomodationId: tripId,
                    };
                    api
                      .post('/api/v1/feedback/sendFeedback')
                      .set('Authorization', `Bearer ${token}`)
                      .send(feedback1)
                      .end((err, res) => {
                        expect(res.status).to.equal(400);
                        expect(res.body).to.have.property('message');
                        expect(res.body.message).to.equal(
                          ' Sorry, trip request must be approved to proceed',
                        );
                      });
                  });
                });
            });
        });
      });
  });

  it('should retrieve all feedback ', () => {
    let token;
    api
      .post('/api/v1/user/auth/signup')
      .send(user1)
      .end((err, res) => {
        const id1 = res.body.data.user.id;
        User.update(
          {
            isVerified: true,
          },
          { where: { id1 } },
        ).then((res) => {
          api
            .post('/api/v1/user/login')
            .send({ email: user1.email, password: user1.password })
            .end((err, res) => {
              const { token } = res.body;
              api
                .get('/api/v1/feedback/getAll')
                .set('Authorization', `Bearer ${token}`)
                .send(feedback)
                .end((err, res) => {
                  expect(res.status).to.equal(201);
                  expect(res.body).to.have.property('message');
                  expect(res.body.message).to.equal(
                    ' Feedback retrieved successfully',
                  );
                });
            });
        });
      });
  });

  it("should not send feedback on accomodation  which you didn't stay in", () => {
    let token;
    api
      .post('/api/v1/user/auth/signup')
      .send(user2)
      .end((err, res) => {
        const id2 = res.body.data.user.id;
        User.update(
          {
            isVerified: true,
          },
          { where: { id2 } },
        ).then((res) => {
          api
            .post('/api/v1/user/login')
            .send({ email: user2.email, password: user2.password })
            .end((err, res) => {
              const { token } = res.body;
              api
                .post('/api/v1/user/trip')
                .set('Authorization', `Bearer ${token}`)
                .send(tripRequest2)

                .end((err, res) => {
                  const tripId = 5;
                  TripRequest.update(
                    {
                      status: 'approved',
                      travelDate:
                        new Date(TripRequest.travelDate).getTime() -
                        24 * 60 * 60 * 1000,
                    },
                    { where: { id: tripId } },
                  ).then((result) => {
                    const feedback = {
                      feedback: 'fantastic',
                      accomodationId: tripId,
                    };
                    api
                      .post('/api/v1/feedback/sendFeedback')
                      .set('Authorization', `Bearer ${token}`)
                      .send(feedback)
                      .end((err, res) => {
                        expect(res.status).to.equal(400);
                        expect(res.body).to.have.property('message');
                        expect(res.body.message).to.equal(
                          ' Sorry, accomodation does not either exist or belong to you',
                        );
                      });
                  });
                });
            });
        });
      });
  });

  it('should not give feedback on a tripRequest which does not spent 24 hrs ', () => {
    let token;
    api
      .post('/api/v1/user/auth/signup')
      .send(user2)
      .end((err, res) => {
        const id2 = res.body.data.user.id;
        User.update(
          {
            isVerified: true,
          },
          { where: { id2 } },
        ).then((res) => {
          api
            .post('/api/v1/user/login')
            .send({ email: user2.email, password: user2.password })
            .end((err, res) => {
              const { token } = res.body;
              api
                .post('/api/v1/user/trip')
                .set('Authorization', `Bearer ${token}`)
                .send(tripRequest2)

                .end((err, res) => {
                  const tripId = 5;
                  TripRequest.update(
                    {
                      status: 'approved',
                    },
                    { where: { id: tripId } },
                  ).then((result) => {
                    const feedback = {
                      feedback: 'awesome',
                      accomodationId: tripId,
                    };
                    api
                      .post('/api/v1/feedback/sendFeedback')
                      .set('Authorization', `Bearer ${token}`)
                      .send(feedback)
                      .end((err, res) => {
                        expect(res.status).to.equal(400);
                        expect(res.body).to.have.property('message');
                        expect(res.body.message).to.equal(
                          ' Sorry,you must wait 24hrs to gain permission of rating',
                        );
                      });
                  });
                });
            });
        });
      });
  });
});
