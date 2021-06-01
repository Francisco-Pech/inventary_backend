const bcrypt = require('bcrypt');
const { Users }=require('../models/index')
const authConfig = require('../config/auth');
const { check , validationResult } = require('express-validator');
require('dotenv').config();

// ============================================================
//  Crear endpoint de modificar contraseña
// ============================================================

/**
 * Creando usuarios nuevos
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
exports.create = async (req,res) =>{
// Express validator
const errors = validationResult(req)
if (!errors.isEmpty()) {
    let _errors = errors.array().map( function filter (element) {
        return {
            msg: element.msg,
        }
    });
    return res.status(422).json({
        data : {},
        message: _errors,
        success : false,
    })
}
    try{
        const filter_users = await Users.findOne({ where: { username: req.body.username } });
        if(!filter_users){
            // Encriptamos la contraseña
            req.body.password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
            req.body.token = bcrypt.hashSync(req.body.username, Number.parseInt(authConfig.rounds) );

            const users_create = await Users.create(req.body);
            return res.status(201).send({
                data: {
                    id: req.body.id,
                    username: req.body.username
                },
                message: [{
                    msg: 'Usuario creado correctamente'
                }],
                success: true
            });
        }else{
            return res.status(409).send({
                data : {},
                message: [{msg: 'Username ya utilizado'}],
                success : false,
            });
        }
    }catch(error){
        // token / username repetido
        return res.status(500).send({
            data: {},
            message : [{msg : error.errors[0].message}],
            success: false
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
            return res.status(201).send({
                data: {
                    id: filter_users.id,
                    username: filter_users.username
                },
                message: [{msg: 'Usuario encontrado correctamente'}],
                success: true
            });
        }else{
            return res.status(404).send({
                data: {},
                message: [{msg: 'Usuario no encontrado'}],
                success: false
            });
        }
    }catch(error){
        return res.status(500).send({
            data: {},
            message: [{msg: error.errors[0].message}],
            success: false
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
                message: [{ msg: 'Usuario encontrado correctamente'}],
                success: true
                });
        }else{
            return res.status(404).send({
                data : {},
                message: [{ msg:'Usuario no encontrado'}],
                success : false,
            });
        }
    }catch(error){
        return res.status(500).send({
            data: {}, 
            message: [{msg: error.errors[0].message}],
            success : false
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
// Express validator
const errors = validationResult(req)
if (!errors.isEmpty()) {
    let _errors = errors.array().map( function filter (element) {
        return {
            msg: element.msg,
        }
    });
    return res.status(422).json({
        data : {},
        message: _errors,
        success : false,
    })
}
    try{
        const filter_users = await Users.findByPk(id);

        if(filter_users){  
            req.body.password = bcrypt.hashSync(req.body.password, Number.parseInt(authConfig.rounds));
            const data_user_update = await Users.update(req.body, {where:{id : id}});
            
            if (data_user_update[0]== 0) {
                return res.status(404).send({
                    data : {},
                    message: [{ msg: 'Usuario no encontrado' }],
                    success : false,
                    
                });
            }else{
                const users_update = await Users.findByPk(id);
                return res.status(201).send({
                    data: {
                        username : users_update.username
                    },
                    message: [{msg: 'Usuario actualizado correctamente'}],
                    success: true
                });
            }
        }else{
            return res.status(404).send({
                data : {},
                message: [{ msg: 'Usuario no encontrado' }],
                success : false,
            });
        }

    }catch(error){
        return res.status(500).send({
            data : {},
            message : [{ msg: error.errors[0].message}],
            success : false,
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
                data : {},
                message: [{ msg: 'Usuario eliminado correctamente' }],
                success : true,
            });
        }else{
            return res.status(404).send({
                data: {},
                message: [{msg: 'Usuario no encontrado'}],
                success: false
            });
        }

    }catch(error){
        return res.status(500).send({
            data: {}, 
            message: [{ msg: error.errors[0].message }],
            success: false,
        });
    }
}