const express = require('express');
const session = require('../controllers/session');
const { check , validationResult } = require('express-validator');
const { isLogged } = require('../middlewares/jwtValid');
const router = express.Router();

//------------------------------------------------Rutas del usuarios--------------------------------------//
/* Iniciamos session */
router.post('/users/login', 
[
    check('password').isLength({ min: 5 }).withMessage('Contraseña debe ser mayor a 5 caracteres'),
    check('username').isLength({ min: 5 }).withMessage('Usuario debe ser mayor a 5 caracteres'),
],session.login);


/* Finalizamos session */
router.post('/users/logout',isLogged,session.logout);

//--------------------------------------------------------------------------------------------------------//



module.exports = router