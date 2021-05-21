const express = require('express');
const bodyparser = require('body-parser');
const app= express();

app.use(bodyparser.json());

const productRoute = require('./routes/product.route');
app.use( fn="/product", productRoute);

module.exports = app