const { Products, groupProducts }=require('../models/index');
const { check , validationResult } = require('express-validator');
require('dotenv').config();

/**
 * Creando productos nuevos
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

           // Hacemos uso de parámetros en mayúsculas
           req.body.name = (req.body.name).toUpperCase();
           req.body.presentation = (req.body.presentation).toUpperCase();
           req.body.laboratory = (req.body.laboratory).toUpperCase();
           req.body.active_substance = (req.body.active_substance).toUpperCase();

            // Filtramos para verificar que no exista el código de barras 
            const filter_products = await groupProducts.findOne({ where: { code: req.body.code } });
            if(!filter_products){

                req.body.percentage = ( req.body.supplier_price*35)/100;

                const groupproduct_create = await groupProducts.create({
                        code: req.body.code,
                        name: req.body.name,
                        group: req.body.group,
                        presentation: req.body.presentation,
                        supplier_price: req.body.supplier_price,
                        percentage: req.body.percentage,
                        suggested_price: req.body.suggested_price,
                        public_price: req.body.public_price,
                        laboratory: req.body.laboratory,
                        existence: req.body.existence,
                        order: req.body.order,
                        fixed_background: req.body.fixed_background,
                        active_substance: req.body.active_substance
                });

                
                const product_create = await Products.create({
                    groupId: groupproduct_create.id,
                    date_of_expiry: req.body.date_of_expiry
                });

                return res.status(200).send({
                    data : {
                        id: product_create.id,
                        code: groupproduct_create.code,
                        name: groupproduct_create.name,
                        group: groupproduct_create.group,
                        presentation: groupproduct_create.presentation,
                        supplier_price: groupproduct_create.supplier_price,
                        percentage: groupproduct_create.percentage,
                        suggested_price: groupproduct_create.suggested_price,
                        public_price: groupproduct_create.public_price,
                        laboratory: groupproduct_create.laboratory,
                        existence: groupproduct_create.existence,
                        order: groupproduct_create.order,
                        fixed_background: groupproduct_create.fixed_background,
                        active_substance: groupproduct_create.active_substance,
                        date_of_expiry: product_create.date_of_expiry
                    },
                    message: [{msg: 'Producto creado correctamente'}],
                    success : true,

                });
                
            }else{
                return res.status(202).send({
                    data : {},
                    message: [{ msg: 'Código de barras repetido'}],
                    success : false
                });
            }
    }catch(error){
        return res.status(500).send({
            data: {},
            message : [{msg: error.errors[0].message}],
            success : false
        });
    }
}

/**
 * Obtenemos los datos de un producto en especifico
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
exports.show = async (req,res) =>{
    try{
        const filter_products = await Products.findByPk(req.params.id);
        if(filter_products){              
            const filter_groupProducts = await groupProducts.findByPk(filter_products.groupId);
            return res.status(200).send({
                data : {
                    id: filter_products.id,
                    code: filter_groupProducts.code,
                    name: filter_groupProducts.name,
                    group: filter_groupProducts.group,
                    presentation: filter_groupProducts.presentation,
                    supplier_price: filter_groupProducts.supplier_price,
                    percentage: filter_groupProducts.percentage,
                    suggested_price: filter_groupProducts.suggested_price,
                    public_price: filter_groupProducts.public_price,
                    laboratory: filter_groupProducts.laboratory,
                    existence: filter_groupProducts.existence,
                    order: filter_groupProducts.order,
                    fixed_background: filter_groupProducts.fixed_background,
                    active_substance: filter_groupProducts.active_substance,
                    date_of_expiry: filter_products.date_of_expiry
                },
                message : [{msg: 'Producto encontrado exitosamente'}],
                success : true
            });
        }else{
            return res.status(404).send({
                data : {},
                message: [{msg : 'Producto no encontrado'}],
                success : false,
            });
        }
    }catch(error){
        return res.status(500).send({
            data : {},
            message: [{msg: error.errors[0].message}],
            success : false
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
        let results_filter_products = {}

        if(req.query.hasOwnProperty('name') || req.query.hasOwnProperty('group') || req.query.hasOwnProperty('active_substance'))
        {
            if (req.query.hasOwnProperty('name')) {
                results_filter_products.name = (req.query.name).toUpperCase();
            }
            if (req.query.hasOwnProperty('group')) {
                results_filter_products.group = (req.query.group).toUpperCase();
            }
            if (req.query.hasOwnProperty('active_substance')) {
                results_filter_products.active_substance = (req.query.active_substance).toUpperCase();
            }

            // Filtramos todos los productos que cumplan con las querys y la cantidad de ellos
            const { count, rows } = await Products.findAndCountAll({order: [['id', 'DESC']], offset: offset, limit: format_for_page});
            const filter_groupProducts = await groupProducts.findAll({ where: results_filter_products, order: [['id', 'DESC']], offset: offset, limit: format_for_page});

            const data_product = filter_groupProducts.map(function filter_groupproduct_map(element) {
                for(let i=0; i<count; i++){
                    if(element.id == rows[i].groupId){
                        return {
                            id: rows[i].id,
                            code: element.code,
                            name: element.name,
                            group: element.group,
                            presentation: element.presentation,
                            supplier_price: element.supplier_price,
                            percentage: element.percentage,
                            suggested_price: element.suggested_price,
                            public_price: element.public_price,
                            laboratory: element.laboratory,
                            existence: element.existence,
                            order: element.order,
                            fixed_background: element.fixed_background,
                            active_substance: element.active_substance,
                            date_of_expiry: rows[i].date_of_expiry
                        }
                    }
                }
              });
          
            if(data_product.length > 0){
                const finish_page = Math.ceil((count/format_for_page));
                return res.status(200).send({ 
                    data: data_product, 
                    finish_page: finish_page, 
                    success : true,
                    message: [{msg: 'Producto encontrado correctamente'}] 
                });
            }else{
                return res.status(404).send({
                    data : {},
                    message: [{ msg: 'Producto no encontrado'}],
                    success : false
                });
            }

        }else{
       
            const { count, rows } =await Products.findAndCountAll({ order: [['id', 'DESC']], offset: offset, limit: format_for_page});
            const filter_groupProducts = await groupProducts.findAll({ order: [['id', 'DESC']], offset: offset, limit: format_for_page});

            const data_product = rows.map(function filter_product_map(element,index) {
                if(element.groupId == filter_groupProducts[index].id){
                    return {
                        id: element.id,
                        code: filter_groupProducts[index].code,
                        name: filter_groupProducts[index].name,
                        group: filter_groupProducts[index].group,
                        presentation: filter_groupProducts[index].presentation,
                        supplier_price: filter_groupProducts[index].supplier_price,
                        percentage: filter_groupProducts[index].percentage,
                        suggested_price: filter_groupProducts[index].suggested_price,
                        public_price: filter_groupProducts[index].public_price,
                        laboratory: filter_groupProducts[index].laboratory,
                        existence: filter_groupProducts[index].existence,
                        order: filter_groupProducts[index].order,
                        fixed_background: filter_groupProducts[index].fixed_background,
                        active_substance: filter_groupProducts[index].active_substance,
                        date_of_expiry: element.date_of_expiry
                    }
                }
              });

            if(data_product.length > 0){
                const finish_page = Math.ceil((count / format_for_page));
                return res.status(200).send({ 
                    data: data_product, 
                    finish_page: finish_page,
                    message: [{msg: 'Producto encontrado correctamente'}],            
                    success : true 
                 });
            }else{
                return res.status(404).send({
                    data : {},
                    message: [{msg: 'Producto no encontrado'}],
                    success : false,
                });
            }
            
        }
        
    }catch(error){
        return res.status(500).send({
            data : {},
            message: [{msg : error.message}],
            success : false,
        });
    }
}

/**
 * Actualizamos los datos del producto
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

                const filter_products = await Products.findByPk(id);
                if(filter_products){

                const data_product_update = await Products.update({ date_of_expiry: req.body.date_of_expiry}, {
                    where:{
                        id : id
                    }
                });

      
                const data_groupproduct_update = await groupProducts.update({ 
                    code: req.body.code,
                    name: req.body.name,
                    group: req.body.group,
                    presentation: req.body.presentation,
                    supplier_price: req.body.supplier_price,
                    percentage: req.body.percentage,
                    suggested_price: req.body.suggested_price,
                    public_price: req.body.public_price,
                    laboratory: req.body.laboratory,
                    existence: req.body.existence,
                    order: req.body.order,
                    fixed_background: req.body.fixed_background,
                    active_substance: req.body.active_substance,
                }, {
                    where:{
                        id : filter_products.groupId
                    }
                });

   
                if ( (data_product_update[0]== 0) || (data_groupproduct_update[0] == 0)) {
                    return res.status(404).send({
                        data : {},
                        message: [{ msg: 'Producto no encontrado'}],
                        success : false
                    });
                }else{
                    const data_product_update_create = await Products.findByPk(id); 
                    const data_groupproduct_update_create = await groupProducts.findByPk(filter_products.groupId); 
                    return res.status(200).send({
                        data : {
                            id: data_product_update_create.id,
                            code: data_groupproduct_update_create.code,
                            name: data_groupproduct_update_create.name,
                            group: data_groupproduct_update_create.group,
                            presentation: data_groupproduct_update_create.presentation,
                            supplier_price: data_groupproduct_update_create.supplier_price,
                            percentage: data_groupproduct_update_create.percentage,
                            suggested_price: data_groupproduct_update_create.suggested_price,
                            public_price: data_groupproduct_update_create.public_price,
                            laboratory: data_groupproduct_update_create.laboratory,
                            existence: data_groupproduct_update_create.existence,
                            order: data_groupproduct_update_create.order,
                            fixed_background: data_groupproduct_update_create.fixed_background,
                            active_substance: data_groupproduct_update_create.active_substance,
                            date_of_expiry: data_product_update_create.date_of_expiry
                        },
                        message: [{msg: 'Producto actualizado correctamente'}],
                        success : true,
                    });
                }
            }else{
                return res.status(404).send({
                    data : {},
                    message: [{msg: 'Producto no encontrado'}],
                    success : false
                });
            }
    }catch(error){
        return res.status(500).send({
            data : {},
            message :   [{msg: error.errors[0].message}],
            success : false
        });
    }
}

/**
 * Eliminamos un producto que deseemos
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
 exports.delete = async (req,res) =>{
    const id = req.params.id;
    try{
        const filter_products = await Products.findByPk(id);
        const filter_groupproducts = await groupProducts.findByPk(filter_products.groupId);
   
        if(filter_products){
            filter_products.destroy();
            filter_groupproducts.destroy();
            return res.status(200).send({
                data : {},
                message: [{msg: 'Producto eliminado correctamente'}],
                success : true,
            });
        }else{
            return res.status(404).send({
                data : {},
                message: [{msg: 'Producto no encontrado'}],
                success : false
            });
        }

    }catch(error){
        return res.status(500).send({
            data : {}, 
            message: [{msg: error.errors[0].message}],
            success: false
        });
    }
 }




