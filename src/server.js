import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import morgan from 'morgan';
import chalk from 'chalk';
import mongoose from 'mongoose';
import 'babel-polyfill';
import productRoutes from './routes/product';
import orderRoutes from './routes/order';
import userRoutes from './routes/user';

dotenv.config();
const app = express();

mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.connect(`mongodb://${process.env.MONGODB_HOST}${process.env.DB_NAME}`);

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.status(200).json({
    status: 200,
    message: 'welcome to my API',
  });
});

app.use('/api/v1/products', productRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/users', userRoutes);

app.use('*', (req, res) => res.status(404).json({
  status: 404,
  error: 'Page not found',
}));

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(chalk.default.yellow.bgBlack.bold(`listening on port ${port}....`));
});
