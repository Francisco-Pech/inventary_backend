const express = require('express');
const products = require('../controllers/product.controller');
const { check , validationResult } = require('express-validator');
const { isLogged } = require('../middlewares/jwtValid');
const router = express.Router();


//-----------------------------------------------Rutas de los productos-----------------------------------//
/* Obtener los datos de todos los productos */
router.get('/products',isLogged, products.index);

/* Obtener datos de un producto */
router.get('/products/:id',isLogged, products.show);

/* Creación de productos */
router.post('/products', isLogged, 
[
    check('code').notEmpty().withMessage('Código de barras requerido'),
    check('name').notEmpty().withMessage('Nombre requerido'),
    check('presentation').notEmpty().withMessage('Presentación requerido'),
    check('price').notEmpty().withMessage('Precio requerido'),
    check('public_price').notEmpty().withMessage('Precio público requerido'),
    check('existence').notEmpty().withMessage('Existencia requerido'),
    check('order').notEmpty().withMessage('Petición requerido'),
    check('fixed_background').notEmpty().withMessage('Fondo fijo requerido'),
]
,products.create);

/* Actualizamos los datos del producto  */
router.put('/products/:id', isLogged,
[
    check('code').notEmpty().withMessage('Código de barras requerido'),
    check('name').notEmpty().withMessage('Nombre requerido'),
    check('presentation').notEmpty().withMessage('Presentación requerido'),
    check('price').notEmpty().withMessage('Precio requerido'),
    check('public_price').notEmpty().withMessage('Precio público requerido'),
    check('existence').notEmpty().withMessage('Existencia requerido'),
    check('order').notEmpty().withMessage('Petición requerido'),
    check('fixed_background').notEmpty().withMessage('Fondo fijo requerido'),
]
,products.update);

/* Eliminamos a un producto */
router.delete('/products/:id', isLogged, products.delete);

//--------------------------------------------------------------------------------------------------------//

module.exports = router