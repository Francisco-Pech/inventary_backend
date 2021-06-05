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
    check('username').isLength({ min: 5 }).withMessage('Usuario debe ser mayor a 5 caracteres'),
    check('password').isLength({ min: 5 }).withMessage('Contraseña debe ser mayor a 5 caracteres'),
]
,users.create);

/* Eliminamos a un usuario */
router.delete('/users/:id', isLogged,users.delete);


/* Actualizamos contraseña  */
router.put('/users/:id', isLogged,
[
    check('password').isLength({ min: 5 }).withMessage('Contraseña debe ser mayor a 5 caracteres'),
    check('new_password').isLength({ min: 5 }).withMessage('Contraseña debe ser mayor a 5 caracteres'),
    check('new_password_repeat').custom((value, { req }) => value === req.body.new_password).withMessage('Contraseña debe coincidir'),
]
,users.update);


//--------------------------------------------------------------------------------------------------------//


module.exports = router