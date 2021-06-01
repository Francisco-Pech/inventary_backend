const express = require('express');
const updateproducts = require('../controllers/updateproduct.controller');
const { check , validationResult } = require('express-validator');
const { isLogged } = require('../middlewares/jwtValid');
const router = express.Router();


//------------------------------------Rutas la actualización de productos---------------------------------//
/* Obtener los datos de todos los productos actualizados */
router.get('/updateproducts',isLogged,updateproducts.index);

/* Obtener datos de un producto actualizado */
router.get('/updateproducts/:id',isLogged,updateproducts.show);

/* Creación de productos actualizados */
router.post('/updateproducts',isLogged,
[
    check('userId').notEmpty().withMessage('ID del usuario requerido'),
    check('productId').notEmpty().withMessage('ID del producto requerido'),
    check('current_existence').notEmpty().withMessage('Existencia del producto requerido'),
]
,updateproducts.create);


//--------------------------------------------------------------------------------------------------------//

module.exports = router