const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
require("dotenv").config();
const uri = process.env.DB_URL;

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
const authRouter = require('./Routers/authRouter');
const restaurantDetailsRouter = require('./Routers/router.js');
const connectDB = require('./db');

// Server Setup
app.listen(8000, function () {
  console.log('Server running on port ' + 8000);
});

// Root route
app.get('/', function (req, res) {
  res.send("Hello world");
});

// Use Routes
app.use('/user', authRouter);
app.use('/', restaurantDetailsRouter);

// Connect to DB
connectDB();

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});
