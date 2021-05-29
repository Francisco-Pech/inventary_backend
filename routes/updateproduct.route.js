const express = require('express');
const updateproducts = require('../controllers/updateproduct.controller');
const { isLogged } = require('../middlewares/jwtValid');
const router = express.Router();


//------------------------------------Rutas la actualización de productos---------------------------------//
/* Obtener los datos de todos los productos actualizados */
router.get('/updateproduct/show', updateproducts.index);

/* Obtener datos de un producto actualizado */
router.get('/updateproduct/show/:id',updateproducts.show);

/* Creación de productos actualizados */
router.post('/updateproduct/create',isLogged,updateproducts.create);


//--------------------------------------------------------------------------------------------------------//

module.exports = router