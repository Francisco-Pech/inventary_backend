const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Users }=require('../models/index')
const authConfig = require('../config/auth');
require('dotenv').config();

/**
 * Creando usuarios nuevos
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
exports.create = async (req,res) =>{
    try{
        if(!req.body.username){
            return res.status(400).send({
                message: 'User required'
            });
        }else if(!req.body.password){
            return res.status(400).send({
                message: 'Password required'
            });
        }
        if(req.body.username && req.body.password){
            const filter_users = await Users.findOne({ where: { username: req.body.username } });
            if(!filter_users){
               // Encriptamos la contraseña
                req.body.password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
                req.body.token = jwt.sign(req.body.username, process.env.TOKEN_SECRET);
                const users_create = await Users.create(req.body);
                return res.status(200).send({
                    message: 'User create successfully'
                });
            }else{
                return res.status(202).send({
                    message:'Existing username'
                });
            }
        }
    }catch(error){
        return res.status(406).send({
            message : error.errors[0].message
        });
    }
}

/**
 * Obtenemos los datos de un usuario en especifico
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
exports.show = async (req,res) =>{
    const id = req.params.id;
    try{
        const filter_users = await Users.findByPk(id);
        if(filter_users){
            return res.status(200).send({
                id: filter_users.id,
                username: filter_users.username,
                message: 'User found successfully' 
            });
        }else{
            return res.status(404).send({
                message:'User not found'
            });
        }
    }catch(error){
        return res.status(500).send({
            error: error, 
            message: error.message
        });
    }
}

/**
 * Obtenemos los datos de todos los usuarios
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
 exports.index = async (req,res) =>{
    try{
        const filter_users = await Users.findAll();

        if(filter_users){
            const data_user = filter_users.map(function filter_user_map(element) {
                return {
                    id: element.id,
                    username: element.username
                }
              });
        
            return res.status(200).send({
                data: data_user,
                message: 'Users found successfully'
                });
        }else{
            return res.status(404).send({
                message: 'Users not found'
            });
        }
    }catch(error){
        return res.status(500).send({
            error: error, 
            message: error.message
        });
    }
}

/**
 * Actualizamos los datos del usuario
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
 exports.update = async (req,res) =>{
    const id = req.params.id;
    try{

        if(!req.body.username){
            return res.status(400).send({
                message: 'User required'
            });
        }else if(!req.body.password){
            return res.status(400).send({
                message: 'Password required'
            });
        }

        if(req.body.username && req.body.password){
            const filter_users = await Users.findByPk(id);

            if(filter_users){  
                req.body.password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
                const data_user_update = await Users.update(req.body, {where:{id : id}});
                
                if (data_user_update[0]== 0) {
                    return res.status(404).send({
                        message: 'User not found'
                    });
                }else{
                    const users_update = await Users.findByPk(id);
                    return res.status(200).send({
                        username : users_update.username,
                        message: 'User update successfully'
                    });
                }
            }else{
                return res.status(404).send({
                    message: 'User not found'
                });
            }
        }

    }catch(error){
        return res.status(406).send({
            message : error.errors[0].message
        });
    }
}

/**
 * Eliminamos un usuario que deseemos
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
 exports.delete = async (req,res) =>{
    const id = req.params.id;
    try{
        const filter_users = await Users.findByPk(id);

        if(filter_users){
            filter_users.destroy();
            return res.status(200).send({
                message: 'User deleted successfully'
            });
        }else{
            return res.status(404).send({
                message: 'User not found'
            });
        }

    }catch(error){
        return res.status(500).send({
            error: error, 
            message: error.message
        });
    }
 }



