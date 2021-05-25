const jwt = require('jsonwebtoken');
const { Users }=require('../models/index')
require('dotenv').config();

/**
 * Creando usuarios nuevos
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
exports.create = async (req,res) =>{
    try{
        if(req.body.username && req.body.password){
            const filter_users = await Users.findOne({ where: { username: req.body.username } });

            if(!filter_users){
                req.body.token = jwt.sign(req.body.username, process.env.TOKEN_SECRET);
                return res.status(200).send(await Users.create(req.body));
            }else{
                return res.status(400).send('Existing username');
            }
        }else{
            return res.status(400).send('Required parameters');
        }
        
    }catch(error){
        return res.status(500).send({
            error: error, 
            message: error.message
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
            return res.status(200).send(filter_users);
        }else{
            return res.status(404).send('User not found');
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
            return res.status(200).send(filter_users);
        }else{
            return res.status(404).send('Users not found');
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
        if(req.body.username && req.body.password){
            const filter_users = await Users.findByPk(id);

            if(filter_users){  
                const data_user_update = await Users.update(req.body, {where:{id : id}});

                if (data_user_update[0]== 0) {
                    return res.status(404).send('User not found');
                }else{
                    return res.status(200).send(await Users.findByPk(id));
                }
            }else{
                return res.status(404).send('User not found');
            }
        }else{
            return res.status(400).send('Required parameters');
        }
    }catch(error){
        return res.status(500).send({
            error: error, 
            message: error.message
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
            return res.status(200).send("User deleted successfully");
        }else{
            return res.status(404).send('User not found');
        }

    }catch(error){
        return res.status(500).send({
            error: error, 
            message: error.message
        });
    }
 }

