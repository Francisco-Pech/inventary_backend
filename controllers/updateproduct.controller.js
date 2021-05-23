const jwt = require('jsonwebtoken');
const { updateProduct, Users, Products }=require('../models/index')
require('dotenv').config();

/**
 * Creando actualización de los productos 
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
 exports.create=async function(req,res){
    try{
        console.log(req.body);
        return res.status(200).send(await updateProduct.create(req.body));
    }catch(err){
        console.log(err)
        return res.status(500).send({});
    }
}


