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
  check('date_of_expiry').notEmpty().withMessage('Fecha de caducidad requerido'),
  check('groupId').notEmpty().withMessage('ID del grupo requerido')
]
,products.create);

/* Actualizamos los datos del producto  */
router.put('/products/:id', isLogged,
[
  check('date_of_expiry').notEmpty().withMessage('Fecha de caducidad requerido'),
  check('groupId').notEmpty().withMessage('ID del grupo requerido')
]
,products.update);

/* Eliminamos a un producto */
router.delete('/products/:id', isLogged, products.delete);

//--------------------------------------------------------------------------------------------------------//

module.exports = router