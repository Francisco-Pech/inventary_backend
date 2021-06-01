const express = require('express');
const users = require('../controllers/user.controller');
const authConfig = require('../config/auth');
var {isLogged} = require('../middlewares/jwtValid.js');
const { check , validationResult } = require('express-validator');
const router = express.Router();

//------------------------------------------------Rutas del usuarios--------------------------------------//
/* Obtener los datos de todos los usuarios */
router.get('/users',isLogged,users.index);

/* Obtener datos de un usuario */
router.get('/users/:id',isLogged,users.show);

/* Creación de usuarios */
router.post('/users',isLogged, 
[
    check('password').isLength({ min: 5 }).withMessage('Contraseña debe ser mayor a 5 caracteres'),
    check('username').isLength({ min: 5 }).withMessage('Usuario debe ser mayor a 5 caracteres'),
]
,users.create);

/* Cambiar contraseña */
router.post('/users/changePassword/:id',isLogged, 
[
    check('new_password').isLength({ min: 5 }).withMessage('Contraseña debe ser mayor a 5 caracteres'),
]
,users.changePassword);

/* Actualizamos los datos del usuario  */
router.put('/users/:id', isLogged,
[
    check('password').isLength({ min: 5 }).withMessage('Contraseña debe ser mayor a 5 caracteres'),
    check('username').isLength({ min: 5 }).withMessage('Usuario debe ser mayor a 5 caracteres'),
]
,users.update);

/* Eliminamos a un usuario */
router.delete('/users/:id', isLogged,users.delete);

//--------------------------------------------------------------------------------------------------------//


module.exports = router