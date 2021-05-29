const express = require('express');
const users = require('../controllers/user.controller');
const authConfig = require('../config/auth');
var {isLogged} = require('../middlewares/jwtValid.js');
const router = express.Router();

//------------------------------------------------Rutas del usuarios--------------------------------------//
/* Obtener los datos de todos los usuarios */
router.get('/user/show',users.index);

/* Obtener datos de un usuario */
router.get('/user/show/:id',users.show);

/* Creación de usuarios */
router.post('/user/create',isLogged,users.create);

/* Actualizamos los datos del usuario  */
router.put('/user/update/:id', isLogged,users.update);

/* Eliminamos a un usuario */
router.delete('/user/delete/:id', isLogged,users.delete);

//--------------------------------------------------------------------------------------------------------//


module.exports = router