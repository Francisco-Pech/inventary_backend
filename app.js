const express = require('express');
const bodyparser = require('body-parser');
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const updateproductRoute = require('./routes/updateproduct.route');
const indexRoute = require('./routes/index.route')
const sessionRoute = require('./routes/session.route');
const cors = require('cors');
const app= express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'PUT', 'POST', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use(cors({
    origin: '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

app.use(bodyparser.json());

app.use(indexRoute);
app.use(userRoute);
app.use(productRoute);
app.use(updateproductRoute);
app.use(sessionRoute);

module.exports = app
