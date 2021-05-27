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

        if(req.body.username && req.body.password){
            
            const filter_users = await Users.findOne({ where: { 
                username: req.body.username,
                password: req.body.password
             } 
            });

            if(filter_users){
                req.body.token = jwt.sign({ username: filter_users.username, id: filter_users.id}, process.env.TOKEN_SECRET);
                filter_users.save();
                return res.status(200).send({
                    id: filter_users.id,
                    username: filter_users.username,
                    message: 'Session successfully logged in'
                });
            }else{
                return res.status(400).send({
                    message: 'Username or Password incorrect'
                });
            }
        }
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
console.log(req.body);
}