const jwt = require('jsonwebtoken');
const { Users }=require('../models/index');
const { updateProduct }=require('../models/index');
const { Products }=require('../models/index');
require('dotenv').config();

/**
 * Creando actualización de los productos 
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
 exports.create = async (req,res) =>{
    try{
        if(!req.body.userId){
            return res.status(400).send({
                message: 'userId required'
            });
        }else if(!req.body.productId){
            return res.status(400).send({
                message: 'productId required'
            });
        }else if(!req.body.current_existence){
            return res.status(400).send({
                message: 'Existence product required'
            });
        }

        if(req.body.userId && req.body.productId && req.body.current_existence){

            const filter_products = await Products.findByPk(req.body.productId);
            const filter_users = await Users.findByPk(req.body.userId);
        
            if(!filter_products && !filter_users){
                return res.status(404).send({
                    message: 'Product and User not found'
                });
            }else if(!filter_users){
                return res.status(404).send({
                    message: 'User not found'
                });
            }else if(!filter_products){
                return res.status(404).send({
                    message: 'Product not found'
                });
            }
            
            if(filter_products && filter_users){
                const update_product_and_user = await updateProduct.create(req.body);
                return res.status(200).send({
                    message: 'updateProduct create successfully'
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
            return res.status(200).send({
                id: filter_products.id,
                userId: filter_products.userId,
                productId:  filter_products.productId,
                current_existence: filter_products.current_existence,
                message: 'updateProduct found successfully'
            });
        }else{
            return res.status(404).send({
                message: 'Update products not found'
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
 * Obtenemos los datos de todos los productos y paginación
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
 exports.index = async (req,res) =>{
    const format_for_page = 10;
    let page = 1;

    // Verificamos si el query contiene la cantidad de paginas deseadas, no puede ser negativo
    if (req.query.hasOwnProperty('page')) {
        if (req.query.page <= 0) {
            page = 1;
        } else {
            page = req.query.page;
        }
    }

    try{
        const offset = (page - 1) * format_for_page;
        let results_filter_updateproducts = {}
        if(req.query.hasOwnProperty('user') || req.query.hasOwnProperty('product') || req.query.hasOwnProperty('existence'))
        {
            if (req.query.hasOwnProperty('user')) {
                results_filter_updateproducts.userId = (req.query.user);
            }
            if (req.query.hasOwnProperty('product')) {
                results_filter_updateproducts.productId = (req.query.product);
            }
            if (req.query.hasOwnProperty('existence')) {
                results_filter_updateproducts.current_existence = (req.query.existence);
            }

            // Filtramos todos las actualizaciones de productos que cumplan con las querys y la cantidad de ellos
            const { count, rows } = await updateProduct.findAndCountAll({ where: results_filter_updateproducts, order: [['id', 'DESC']], offset: offset, limit: format_for_page});

            const data_update_product = rows.map(function filter_updateproduct_map(element) {
                return {
                    id: element.id,
                    userId: element.userId,
                    productId: element.productId,
                    current_existence: element.current_existence
                }
              });

            if(data_update_product.length > 0){
                const finish_page = Math.ceil((count/format_for_page));
                return res.status(200).send({ 
                    data: data_update_product, 
                    finish_page: finish_page,
                    message: 'updateProducts found successfully' 
                });
            }else{
                return res.status(404).send({
                    message: 'Register updateProduct not found'
                });
            }
        }else{

            // Filtramos todos los productos que cumplan con las querys y la cantidad de ellos
            const { count, rows } = await updateProduct.findAndCountAll({order: [['id', 'DESC']], offset: offset, limit: format_for_page});
         
            const data_update_product = rows.map(function filter_updateproduct_map(element) {
                return {
                    id: element.id,
                    userId: element.userId,
                    productId: element.productId,
                    current_existence: element.current_existence
                }
              });

            if(data_update_product.length > 0){
                const finish_page = Math.ceil((count/format_for_page));
                return res.status(200).send({ 
                    data: data_update_product, 
                    finish_page: finish_page,
                    message: 'updateProducts found successfully'  
                });
            }else{
                return res.status(404).send({ 
                    message:'Register updateProduct not found'
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

