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
  check('group').notEmpty().withMessage('Nombre requerido').isIn(['MEDICAMENTOS','ANTIBIOTICOS','MEDICAMENTOS CONTROLADOS','PERFUMERIA','CURACIONES']),
  check('presentation').notEmpty().withMessage('Presentación requerido'),
  check('supplier_price').notEmpty().withMessage('Precio de proveedor requerido'),
  check('percentage').notEmpty().withMessage('Porcentaje de ganancia requerido'),
  check('suggested_price').notEmpty().withMessage('Precio sugerido requerido'),
  check('public_price').notEmpty().withMessage('Precio público requerido'),
  check('laboratory').notEmpty().withMessage('Nombre de laboratorio requerido'),
  check('existence').notEmpty().withMessage('Existencia requerido'),
  check('order').notEmpty().withMessage('Número de producto por comprar requerido'),
  check('fixed_background').notEmpty().withMessage('Fondo fijo requerido'),
  check('active_substance').notEmpty().withMessage('Sustancia activa requerido'),
  check('date_of_expiry').notEmpty().withMessage('Fecha de caducidad requerido'), 
]
,products.create);

/* Actualizamos los datos del producto  */
router.put('/products/:id', isLogged,
[
  check('code').notEmpty().withMessage('Código de barras requerido'),
  check('name').notEmpty().withMessage('Nombre requerido'),
  check('group').notEmpty().withMessage('Nombre requerido').isIn(['MEDICAMENTOS','ANTIBIOTICOS','MEDICAMENTOS CONTROLADOS','PERFUMERIA','CURACIONES']),
  check('presentation').notEmpty().withMessage('Presentación requerido'),
  check('supplier_price').notEmpty().withMessage('Precio de proveedor requerido'),
  check('percentage').notEmpty().withMessage('Porcentaje de ganancia requerido'),
  check('suggested_price').notEmpty().withMessage('Precio sugerido requerido'),
  check('public_price').notEmpty().withMessage('Precio público requerido'),
  check('laboratory').notEmpty().withMessage('Nombre de laboratorio requerido'),
  check('existence').notEmpty().withMessage('Existencia requerido'),
  check('order').notEmpty().withMessage('Número de producto por comprar requerido'),
  check('fixed_background').notEmpty().withMessage('Fondo fijo requerido'),
  check('active_substance').notEmpty().withMessage('Sustancia activa requerido'),
  check('date_of_expiry').notEmpty().withMessage('Fecha de caducidad requerido'), 
]
,products.update);

/* Eliminamos a un producto */
router.delete('/products/:id', isLogged, products.delete);

//--------------------------------------------------------------------------------------------------------//

module.exports = router