const express = require('express');
const products = require('../controllers/product.controller');
const { isLogged } = require('../middlewares/jwtValid');
const router = express.Router();


//-----------------------------------------------Rutas de los productos-----------------------------------//
/* Obtener los datos de todos los productos */
router.get('/product/show', products.index);

/* Obtener datos de un producto */
router.get('/product/show/:id',products.show);

/* Creación de productos */
router.post('/product/create', isLogged ,products.create);

/* Actualizamos los datos del producto  */
router.put('/product/update/:id', isLogged,products.update);

/* Eliminamos a un producto */
router.delete('/product/delete/:id', isLogged, products.delete);

//--------------------------------------------------------------------------------------------------------//

module.exports = router