const jwt = require('jsonwebtoken');
const { Users }=require('../models/index');
const { updateProduct }=require('../models/index');
const { Products }=require('../models/index');
const { check , validationResult } = require('express-validator');
require('dotenv').config();



/**
 * Creando actualización de los productos 
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
        
            const filter_products = await Products.findByPk(req.body.productId);
            const filter_users = await Users.findByPk(req.body.userId);
        
            if(!filter_products && !filter_users){
                return res.status(404).send({
                    data: {},
                    message: [{ msg:'Producto y Usuario no encontrado'}],
                    success: false
                });
            }else if(!filter_users){
                return res.status(404).send({
                    data: {},
                    message: [{ msg:'Usuario no encontrado'}],
                    success: false
                });
            }else if(!filter_products){
                return res.status(404).send({
                    data: {},
                    message: [{ msg:'Product no encontrado'}],
                    success: false
                });
            }
            
            if(filter_products && filter_users){
                const update_product_and_user = await updateProduct.create(req.body);
                return res.status(200).send({
                    data: {
                        userId: update_product_and_user.userId,
                        productId: update_product_and_user.productId,
                        current_existence: update_product_and_user.current_existence
                    },
                    message: [{ msg:'Actualización del producto creada correctamente'}],
                    success: true
                });
            }

    }catch(error){
        return res.status(500).send({
            data: {},
            message: [{ msg:error.errors[0].message}],
            success: false
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
                data: {
                    id: filter_products.id,
                    userId: filter_products.userId,
                    productId:  filter_products.productId,
                    current_existence: filter_products.current_existence,
                },
                message: [{ msg:'Producto actualizado encontrado'}],
                success: true
            });
        }else{
            return res.status(404).send({
                data: {},
                message: [{ msg:'Producto actualizado no encontrado'}],
                success: false
            });
        }
    }catch(error){
        return res.status(500).send({
            data: {},
            message: [{ msg:error.errors[0].message}],
            success: false
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
                    message: [{ msg:'Productos actualizados encontrados' }],
                    success: true
                });
            }else{
                return res.status(404).send({
                    data: {},
                    message: [{ msg:'Productos actualizados no encontrados'}],
                    success: false
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
                    message: [{ msg: 'Productos actualizados encontrados'}],
                    success: true
                });
            }else{
                return res.status(404).send({ 
                    data: {},
                    message: [{ msg:'Productos actualizados no encontrados'}],
                    success: false
                });
            }
        }
    }catch(error){
        return res.status(500).send({
            data: {},
            message: [{ msg:error.errors[0].message}],
            success: false
        });
    }
}

