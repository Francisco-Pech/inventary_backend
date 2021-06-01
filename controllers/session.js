const bcrypt = require('bcrypt');
const authConfig = require('../config/auth');
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
       
        if(req.body.username && req.body.password ){
            
        const filter_users  =  await Users.findOne({
            where: {
                username: req.body.username,
            }
        });

            if(filter_users && bcrypt.compareSync(req.body.password, filter_users.password)){
            // if(filter_users){
                // req.body.token = jwt.sign({ username: filter_users.username, id: filter_users.id}, process.env.TOKEN_SECRET); 
                req.body.token = bcrypt.hashSync(req.body.username, Number.parseInt(authConfig.rounds) ); 
                // Se actualiza nuevo Token
                filter_users.save();
                delete req.body.password;
                await Users.update(req.body, {where:{username : req.body.username}});
                return res.status(200).send({
                    id: filter_users.id,
                    username: filter_users.username,
                    token : req.body.token,
                    message: 'Session successfully logged in'
                });
            }else{
                return res.status(400).send({
                    message: 'Password or Username incorrect'
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
        message: "Sesión cerrada"
    });
}
