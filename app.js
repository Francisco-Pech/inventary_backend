const express = require('express');
const bodyparser = require('body-parser');
const userRoute = require('./routes/user.route');
const productRoute = require('./routes/product.route');
const updateproductRoute = require('./routes/updateproduct.route');
const sessionRoute = require('./routes/session.route');
const app= express();

app.use(bodyparser.json());

app.get('/', (req, res) =>{
    res.send('Bienvenido a la API REST');
});

app.use(userRoute);
app.use(productRoute);
app.use(updateproductRoute);
app.use(sessionRoute);

module.exports = app