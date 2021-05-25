const jwt = require('jsonwebtoken');
const { updateProduct }=require('../models/index')
require('dotenv').config();

/**
 * Creando actualización de los productos 
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
 exports.create = async (req,res) =>{
    try{
        console.log(req.body);
        return res.status(200).send(await updateProduct.create(req.body));
    }catch(error){
        return res.status(500).send({
            error: error, 
            message: error.message
        });
    }
}

/**
 * Obtenemos los datos de un producto especificado
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
 exports.show = async (req,res) =>{
    const id = req.params.id;
    try{
        const filter_products = await updateProduct.findByPk(id);
        if(filter_products){
            return res.status(200).send(filter_products);
        }else{
            return res.status(404).send('Update products not found');
        }
    }catch(error){
        return res.status(500).send({
            error: error, 
            message: error.message
        });
    }
}

/**
 * Obtenemos los datos de todos los productos actualizados
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
 exports.index = async (req,res) =>{
    try{
        const filter_products = await updateProduct.findAll();
        if(filter_products){
            return res.status(200).send(filter_products);
        }else{
            return res.status(404).send('Update products not found');
        }
    }catch(error){
        return res.status(500).send({
            error: error, 
            message: error.message
        });
    }
}

