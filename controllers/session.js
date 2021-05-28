const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
//const  Users = require("../models/users");
const jwt = require('jsonwebtoken');
const { Users }=require('../models/index')
require('dotenv').config();

/**
 * Iniciar sesión
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
exports.login = async (req,res) =>{ 
//let user;
 
try{

        if(!req.body.username){
            return res.status(400).send({
                message: 'Username required'
            });
        }else if(!req.body.password){
            return res.status(400).send({
                message: 'Password required'
            });
        }
//if (!filter_users) {
  //    return res.status(401).send({ errors: "Invalid user" });
    //}

// Buscar usuario
        //const filter_users = await Users.findOne({
          //  where: {
            //    username: req.body.username,
              //  password: req.body.password
            //}
        //}).then(user => {

            //if (!user) {
              //  res.status(404).json({ msg: "Usuario con este correo no encontrado" });
            //}
        if(req.body.username && req.body.password ){
            
          const filter_users  =  await Users.findOne({
            where: {
                username: req.body.username,
<<<<<<< HEAD
                //password: req.body.password
            }
        })
//if (!filter_users) {
  //    return res.status(401).send({ errors: "Invalid user" });
    //}
            if(filter_users && bcrypt.compareSync(req.body.password, filter_users.password)){
=======
                password: req.body.password
             } 
            });
            if(filter_users){
>>>>>>> a951f385324167da481a607b303d64270199e2ea
                req.body.token = jwt.sign({ username: filter_users.username, id: filter_users.id}, process.env.TOKEN_SECRET);
                filter_users.save();
                return res.status(200).send({
                    id: filter_users.id,
                    username: filter_users.username,
                    message: 'Session successfully logged in'
                });
            }else{
                return res.status(400).send({
                    message: 'Password incorrect'
                });
            }
        }
//});
    }catch(error){
        return res.status(500).send({
            error: error, 
            message: error.message
        });
    }
}


 /**
 * Cerrar sesión
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
exports.logout = async (req,res) =>{
<<<<<<< HEAD
console.log(req.body);
}
=======
    console.log(req.body);
    // Borrar el token 
    return res.status(200).send("Sesión cerrada");
}
>>>>>>> a951f385324167da481a607b303d64270199e2ea
