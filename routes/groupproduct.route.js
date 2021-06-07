const express = require('express');
const groupProducts = require('../controllers/groupProduct.controller');
const { check , validationResult } = require('express-validator');
const { isLogged } = require('../middlewares/jwtValid');
const router = express.Router();


//-----------------------------------------------Rutas de los productos-----------------------------------//
/* Obtener los datos del grupo de productos */
router.get('/groupProducts',isLogged, groupProducts.index);

/* Obtener datos de un grupo de producto */
router.get('/groupProducts/:id',isLogged, groupProducts.show);

/* Creación de grupo de productos */
router.post('/groupProducts', isLogged, 
[
    check('active_substance').notEmpty().withMessage('Sustancia activa requerido'),
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
]
,groupProducts.create);

/* Actualizamos los datos del grupo de productos  */
router.put('/groupProducts/:id', isLogged,
[
    check('active_substance').notEmpty().withMessage('Sustancia activa requerido'),
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
]
,groupProducts.update);

/* Eliminamos un grupo de productos */
router.delete('/groupProducts/:id', isLogged, groupProducts.delete);

//--------------------------------------------------------------------------------------------------------//

module.exports = router