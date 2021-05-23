const express = require('express');
const bodyparser = require('body-parser');
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const app= express();

app.use(bodyparser.json());

app.use(userRoute);
app.use(productRoute);

module.exports = app