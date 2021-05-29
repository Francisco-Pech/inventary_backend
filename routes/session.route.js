const express = require('express');
const session = require('../controllers/session');
const { isLogged } = require('../middlewares/jwtValid');
const router = express.Router();

//------------------------------------------------Rutas del usuarios--------------------------------------//
/* Iniciamos session */
router.post('/user/login',session.login);


/* Finalizamos session */
router.post('/user/logout',isLogged,session.logout);

//--------------------------------------------------------------------------------------------------------//



module.exports = router