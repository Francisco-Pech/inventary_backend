const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
const { Users }=require('../models/index');
const { check , validationResult } = require('express-validator');
require('dotenv').config();

/**
 * Iniciar sesión
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
exports.login = async (req,res) =>{
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
            
        const filter_users  =  await Users.findOne({
            where: {
                username: req.body.username,
            }
        });

            if(filter_users && bcrypt.compareSync(req.body.password, filter_users.password)){

                req.body.token = bcrypt.hashSync(req.body.username, Number.parseInt(authConfig.rounds) ); 
                    
                // Se actualiza nuevo Token
                filter_users.save();
                delete req.body.password;
                await Users.update(req.body, {where:{username : req.body.username}});
                return res.status(200).send({
                    data: {
                        id: filter_users.id,
                        username: filter_users.username,
                        token : req.body.token,
                    },
                    message: [{ msg:'Sesión iniciada correctamente'}],
                    success: true
                });
            }else{
                return res.status(400).send({
                    data: {},
                    message: [{ msg:'Usuario o contraseña incorrectos'}],
                    success: false
                });
            }
    }catch(error){
        return res.status(500).send({
            data: {},
            message: [{ msg: error.errors[0].message }],
            success: false
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
    // const id = req.body.token;
    var _token = req.headers.authorization.split(" ")[1];
    const token  = await Users.findOne({ where: { token: _token } });

    // const filter_products = await Users.findByPk(id);
    let body = {
        token : "",
    };
    const data_product_update = await Users.update(body, {
        where:{
            token : token.dataValues.token,
        }
    });
    // Borrar el token 
    return res.status(200).send({
        data: {},
        message: [{ msg: "Sesión cerrada" }],
        success: true
    });
}


