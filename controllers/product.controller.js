const { Products }=require('../models/index')
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
        data : [],
        message: _errors,
        success : false,
    })
}
    try{

// if(!req.body.code){
//     return res.status(400).send({
//         message: 'Barcode required'
//     });
// }else if(!req.body.name){
//     return res.status(400).send({
//         message: 'Name required'
//     });
// }else if(!req.body.presentation){
//     return res.status(400).send({
//         message: 'Presentation required'
//     });
// }else if(!req.body.price){
//     return res.status(400).send({
//         message: 'Price required'
//     });
// }else if(!req.body.public_price){
//     return res.status(400).send({
//         message: 'Public price required'
//     });
// }else if(!req.body.existence){
//     return res.status(400).send({
//         message: 'Existence required'
//     });
// }else if(!req.body.order){
//     return res.status(400).send({
//         message: 'Order required'
//     });
// }else if(!req.body.fixed_background){
//     return res.status(400).send({
//         message: 'Fixed background required'
//     });
// }
        
        // Verificamos que los parámetros necesarios estén completos
        // if(req.body.code && req.body.name && req.body.presentation && req.body.price && req.body.public_price 
        //    && req.body.existence && req.body.order && req.body.fixed_background){
        
            // Hacemos uso de parámetros en mayúsculas
            req.body.name = (req.body.name).toUpperCase();
            req.body.presentation = (req.body.presentation).toUpperCase();
            req.body.generic_compound = (req.body.generic_compound).toUpperCase();
            req.body.specs = (req.body.specs).toUpperCase();

            // Filtramos para verificar que no exista el código de barras 
            const filter_products = await Products.findOne({ where: { code: req.body.code } });
            if(!filter_products){
                const product_create = await Products.create(req.body);
                return res.status(200).send({
                    data : [],
                    message: [{msg: 'Producto creado correctamente'}],
                    success : true,

                });
            }else{
                return res.status(202).send({
                    data : [],
                    message: [{ msg: 'Código de barras repetido'}],
                    success : false
                });
            }
        // }
    }catch(error){
        return res.status(406).send({
            data: [],
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
        const filter_products = await Products.findByPk(id);
        if(filter_products){
            return res.status(200).send({
                data : [{
                id: filter_products.id,
                code: filter_products.code,
                name: filter_products.name,
                generic_compound: filter_products.generic_compound,
                specs: filter_products.specs,
                presentation: filter_products.presentation,
                price: filter_products.price,
                public_price: filter_products.public_price,
                existence: filter_products.existence,
                order: filter_products.order,
                fixed_background: filter_products.fixed_background,
                message: 'Product found successfully'
                }],
                message : [],
                success : true
            });
        }else{
            return res.status(404).send({
                data : [],
                message: [{msg : 'Product not found'}],
                success : false,
            });
        }
    }catch(error){
        return res.status(500).send({
            data : [],
            error: error, 
            message: [{msg: error.errors[0].message}]
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
            const { count, rows } = await Products.findAndCountAll({ where: results_filter_products, order: [['id', 'DESC']], offset: offset, limit: format_for_page});

            
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
                    existence: element.existence,
                    order: element.order,
                    fixed_background: element.fixed_background,
                    laboratory: element.laboratory
                }
              });

            if(data_product.length > 0){
                const finish_page = Math.ceil((count/format_for_page));
                return res.status(200).send({ 
                    data: data_product, 
                    finish_page: finish_page, 
                    message: 'Products found successfully' 
                });
            }else{
                return res.status(404).send({
                    message: 'Products not found'
                });
            }

        }else{
       
            const { count, rows } = await Products.findAndCountAll({ order: [['id', 'DESC']], offset: offset, limit: format_for_page});
     
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
                    existence: element.existence,
                    order: element.order,
                    fixed_background: element.fixed_background,
                    laboratory: element.laboratory
                }
              });

            if(data_product.length > 0){
                const finish_page = Math.ceil((count / format_for_page));
                return res.status(200).send({ 
                    data: data_product, 
                    finish_page: finish_page,
                    message: 'Products found successfully' 
                 });
            }else{
                return res.status(404).send({
                    message: 'Products not found'
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
 * Actualizamos los datos del producto
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
 exports.update = async (req,res) =>{
    const id = req.params.id;
    try{

        if(!req.body.code){
            return res.status(400).send({
                message: 'Barcode required'
            });
        }else if(!req.body.name){
            return res.status(400).send({
                message: 'Name required'
            });
        }else if(!req.body.presentation){
            return res.status(400).send({
                message: 'Presentation required'
            });
        }else if(!req.body.price){
            return res.status(400).send({
                message: 'Price required'
            });
        }else if(!req.body.public_price){
            return res.status(400).send({
                message: 'Public price required'
            });
        }else if(!req.body.existence){
            return res.status(400).send({
                message: 'Existence required'
            });
        }else if(!req.body.order){
            return res.status(400).send({
                message: 'Order required'
            });
        }else if(!req.body.fixed_background){
            return res.status(400).send({
                message: 'Fixed background required'
            });
        }

        // Verificamos que los parámetros necesarios estén completos
        if(req.body.code && req.body.name && req.body.presentation && req.body.price && req.body.public_price 
            && req.body.existence && req.body.order && req.body.fixed_background){

                const filter_products = await Products.findByPk(id);
                if(filter_products){

                const data_product_update = await Products.update(req.body, {
                    where:{
                        id : id
                    }
                });

                if (data_product_update[0]== 0) {
                    return res.status(404).send({
                        message: 'Product not found'
                    });
                }else{
                    const data_product_update_create = await Products.findByPk(id); 
                    return res.status(200).send({
                        message: 'Product update successfully'
                    });
                }
            }else{
                return res.status(404).send({
                    message: 'Product not found'
                });
            }
        }
    }catch(error){
        return res.status(406).send({
            message : error.errors[0].message
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

        if(filter_products){
            filter_products.destroy();
            return res.status(200).send({
                message: 'Product deleted successfully'
            });
        }else{
            return res.status(404).send({
                message: 'Product not found'
            });
        }

    }catch(error){
        return res.status(500).send({
            error: error, 
            message: error.message
        });
    }
 }




