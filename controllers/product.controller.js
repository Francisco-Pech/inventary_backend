const jwt = require('jsonwebtoken');
const { Products }=require('../models/index')
require('dotenv').config();


/**
 * Creando productos nuevos
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
 exports.create=async function(req,res){
    try{
        console.log(req.body);
        return res.status(200).send(await Products.create(req.body));
    }catch(err){
        console.log({ error: err, message: err.message });
        return res.status(500).send({});
    }
}

/**
 * Obtenemos los datos de un producto en especifico
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
exports.show=async function(req,res){
    const id = req.params.id;
    try{
        const filter_products = await Products.findByPk(id);
        if(filter_products){
            return res.status(200).send(filter_products);
        }else{
            return res.status(404).send('Product not found');
        }
    }catch(error){
        console.log({ error: err, message: err.message });
        return res.status(500).send({});
    }
}

/**
 * Obtenemos los datos de todos los productos
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
 exports.index=async function(req,res){
    
    try{
        const filter_products = await Products.findAll();
        if(filter_products){
            return res.status(200).send(filter_products);
        }else{
            return res.status(404).send('Products not found');
        }
    }catch(error){
        console.log({ error: err, message: err.message });
        return res.status(500).send({});
    }
}

/**
 * Actualizamos los datos del producto
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
 exports.update=async function(req,res){
    const id = req.params.id;
    try{
        const filter_products = await Products.findByPk(id);
        if(filter_products){

            const data_product_update = await Products.update(req.body, {
                where:{
                    id : id
                }
            });

            if (data_product_update[0]== 0) {
                return res.status(404).send('Product not found');
            }else{
                return res.status(200).send(await Products.findByPk(id));
            }
        }else{
            return res.status(404).send('product not found');
        }
    }catch(error){
        console.log({ error: err, message: err.message });
        return res.status(500).send({});
    }
}

/**
 * Eliminamos un producto que deseemos
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
 exports.delete=async function(req,res){
    const id = req.params.id;
    try{
        const filter_products = await Products.findByPk(id);

        if(filter_products){
            filter_products.destroy();
            return res.status(200).send("Product deleted successfully");
        }else{
            return res.status(404).send('Product not found');
        }

    }catch(error){
        console.log({ error: err, message: err.message });
        return res.status(500).send({});
    }
 }




