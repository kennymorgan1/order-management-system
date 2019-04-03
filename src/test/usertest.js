import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import app from '../server';
import User from '../models/user';

const { expect } = chai;
chai.use(chaiHttp);
dotenv.config();

process.env.DB_NAME = 'order_test';

describe('User', () => {
  beforeEach((done) => {
    User.remove({}, () => {
      done();
    });
  });

  describe('Create user test', () => {

    it('should create a user successfully', async () => {
    // eslint-disable-next-line no-return-await
      await chai.request(app)
        .post('/api/v1/users/signup')
        .send({
          firstName: 'testname1',
          lastName: 'testname1',
          email: 'testname1@yahoo.com',
          password: 'test12345',
          confirmPassword: 'test12345',
        })
        .then((res) => {
          expect(res).to.have.status(201);
          expect(res.body.status).to.be.eql(201);
          expect(res.body.message).to.be.eql('user created');
        });
    });
  });
});
