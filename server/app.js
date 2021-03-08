require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import userRouter from './router/user';

const app = express();

mongoose.connect(process.env.__MONGO_URI__, { useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify : false })
				.then(() => { console.log('\nSuccessully connected to MongoDB Atlas !\n')})
				.catch((error) => console.error('\nUnable to connect to MongoDB Atlas\n', error));

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use('/user', userRouter);

export default app;
