const { groupProducts }=require('./models/index')
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
            req.body.generic_compound = (req.body.generic_compound).toUpperCase();
            req.body.specs = (req.body.specs).toUpperCase();
            req.body.laboratory = (req.body.laboratory).toUpperCase();

            // Filtramos para verificar que no exista el código de barras 
            const filter_products = await groupProducts.findOne({ where: { code: req.body.code } });
            if(!filter_products){
                const product_create = await groupProducts.create(req.body);
                return res.status(200).send({
                    data : {
                        code: product_create.code,
                        name: product_create.name,
                        generic_compound: product_create.generic_compound,
                        specs: product_create.specs,
                        presentation: product_create.presentation,
                        price: product_create.price,
                        public_price: product_create.public_price,
                      //  existence: product_create.existence,
                      //  order: product_create.order,
                      //  fixed_background: product_create.fixed_background,
                        laboratory: product_create.laboratory,
                        groupId: product_create.groupId,
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
    const id = req.params.id;
    try{
        const filter_products = await groupProducts.findByPk(id);
        if(filter_products){
            return res.status(200).send({
                data : {
                id: filter_products.id,
                code: filter_products.code,
                name: filter_products.name,
                generic_compound: filter_products.generic_compound,
                specs: filter_products.specs,
                presentation: filter_products.presentation,
                price: filter_products.price,
                public_price: filter_products.public_price,
               // existence: filter_products.existence,
               // order: filter_products.order,
               // fixed_background: filter_products.fixed_background,
                laboratory: filter_products.laboratory,
                groupId: filter_products.groupId,
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

        if(req.query.hasOwnProperty('name') || req.query.hasOwnProperty('presentation') || req.query.hasOwnProperty('generic_compound'))
        {
            if (req.query.hasOwnProperty('name')) {
                results_filter_products.name = (req.query.name).toUpperCase();
            }
            if (req.query.hasOwnProperty('presentation')) {
                results_filter_products.presentation = (req.query.presentation).toUpperCase();
            }
            if (req.query.hasOwnProperty('generic_compound')) {
                results_filter_products.generic_compound = (req.query.generic_compound).toUpperCase();
            }

            // Filtramos todos los productos que cumplan con las querys y la cantidad de ellos
            const { count, rows } = await groupProducts.findAndCountAll({ where: results_filter_products, order: [['id', 'DESC']], offset: offset, limit: format_for_page});

            
            const data_product = rows.map(function filter_product_map(element) {
                return {
                    id: element.id,
                    code: element.code,
                    name: element.name,
                    generic_compound: element.generic_compound,
                    specs: element.specs,
                    presentation: element.presentation,
                    price: element.price,
                    public_price: element.public_price,
                    //existence: element.existence,
                    //order: element.order,
                    //fixed_background: element.fixed_background,
                    laboratory: element.laboratory,
                    groupId: element.groupId,
                    date_of_expiry: element.date_of_expiry
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
       
            const { count, rows } = await groupProducts.findAndCountAll({ order: [['id', 'DESC']], offset: offset, limit: format_for_page});
     
            const data_product = rows.map(function filter_product_map(element) {
                return {
                    id: element.id,
                    code: element.code,
                    name: element.name,
                    generic_compound: element.generic_compound,
                    specs: element.specs,
                    presentation: element.presentation,
                    price: element.price,
                    public_price: element.public_price,
                    //existence: element.existence,
                    //order: element.order,
                    //fixed_background: element.fixed_background,
                    laboratory: element.laboratory,
                    groupId: element.groupId,
                    date_of_expiry: element.date_of_expiry
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

                const filter_products = await groupProducts.findByPk(id);
                if(filter_products){

                const data_product_update = await groupProducts.update(req.body, {
                    where:{
                        id : id
                    }
                });

                if (data_product_update[0]== 0) {
                    return res.status(404).send({
                        data : {},
                        message: [{ msg: 'Producto no encontrado'}],
                        success : false
                    });
                }else{
                    const data_product_update_create = await groupProducts.findByPk(id); 
                    return res.status(200).send({
                        data : {
                            code: data_product_update_create.code,
                            name: data_product_update_create.name,
                            generic_compound: data_product_update_create.generic_compound,
                            specs: data_product_update_create.specs,
                            presentation: data_product_update_create.presentation,
                            price: data_product_update_create.price,
                            public_price: data_product_update_create.public_price,
                           // existence: data_product_update_create.existence,
                           // order: data_product_update_create.order,
                           // fixed_background: data_product_update_create.fixed_background,
                            laboratory: data_product_update_create.laboratory,
                            groupId: data_product_update_create.groupId,
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
        const filter_products = await groupProducts.findByPk(id);

        if(filter_products){
            filter_products.destroy();
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




