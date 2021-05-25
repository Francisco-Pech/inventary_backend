const express = require('express');
const products = require('../controllers/product.controller');
const router = express.Router();


//-----------------------------------------------Rutas de los productos-----------------------------------//
/* Obtener los datos de todos los productos */
router.get('/product/show', products.index);

/* Obtener datos de un producto */
router.get('/product/show/:id',products.show);

/* Creación de productos */
router.post('/product/create',products.create);

/* Actualizamos los datos del producto  */
router.put('/product/update/:id', products.update);

/* Eliminamos a un producto */
router.delete('/product/delete/:id', products.delete);

//--------------------------------------------------------------------------------------------------------//

module.exports = router