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
    check('generic_compound').notEmpty().withMessage('Código de barras requerido'),
    check('username').isLength({ min: 5 }).withMessage('Usuario debe ser mayor a 5 caracteres'),
]
,products.create);

/* Actualizamos los datos del producto  */
router.put('/products/:id', isLogged,
[
    check('password').isLength({ min: 5 }).withMessage('Contraseña debe ser mayor a 5 caracteres'),
    check('username').isLength({ min: 5 }).withMessage('Usuario debe ser mayor a 5 caracteres'),
]
,products.update);

/* Eliminamos a un producto */
router.delete('/products/:id', isLogged, products.delete);

//--------------------------------------------------------------------------------------------------------//

module.exports = router