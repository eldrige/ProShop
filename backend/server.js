// const express = require('express');
import express from 'express';
import colors from 'colors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
connectDB();

const app = express();
// * allows us to use json data in the body(req.body)
app.use(express.json());
app.use(morgan('dev'));
app.get('/', (req, res) => {
  res.send('API is running');
});

app.use('/api/products/', productRoutes);
app.use('/api/users/', userRoutes);
app.use('/api/orders/', orderRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode  port ${PORT}`.yellow.bold
  );
});
