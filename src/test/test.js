import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from '../server';
import Order from '../models/order';
import User from '../models/user';

const { expect } = chai;
chai.use(chaiHttp);
dotenv.config();

process.env.DB_NAME = 'order_test';

const clearDB = (done) => {
  mongoose.set('useCreateIndex', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.connect(`mongodb://${process.env.MONGODB_HOST}${process.env.DB_NAME}`);

  const order = Order;

  order.deleteMany(() => {
    mongoose.close(() => {
      done();
    });
  });
};

const clearDBUser = (done) => {
  mongoose.set('useCreateIndex', true);
  mongoose.set('useNewUrlParser', true);
  mongoose.connect(`mongodb://${process.env.MONGODB_HOST}${process.env.DB_NAME}`);

  const user = User;

  user.deleteMany(() => {
    mongoose.close(() => {
      done();
    });
  });
};

after((done) => {
  clearDBUser(done);
});

beforeEach((done) => {
  clearDBUser(done);
});

after((done) => {
  clearDB(done);
});
