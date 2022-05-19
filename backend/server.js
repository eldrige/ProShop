// const express = require('express');
import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';
const __dirname = path.resolve();

dotenv.config();
connectDB();

const app = express();
// * allows us to use json data in the body(req.body)
app.use(express.json());

if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'));
}

// app.get('/', (req, res) => {
//   res.send('API is running');
// });

const publicPath = path.join(__dirname, '/frontend/build');

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

// in es6 __dirname isnt availble, thats why we mimic it using path
// const __dirname = path.resolve();
// we are exposing the uploads folder (backend) to the frontend
app.use('/uploads', express.static('uploads'));

app.use(express.static(publicPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(publicPath, 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode  port ${PORT}`.yellow.bold
  );
});
