const { Products }=require('../models/index')
require('dotenv').config();

/**
 * Creando productos nuevos
 * @param {*} req representa a require el cual obtiene los datos desde el cliente
 * @param {*} res da la respuesta hacia el cliente
 * @returns 
 */
 exports.create = async (req,res) =>{
    try{
        // Verificamos que los parámetros necesarios estén completos
        if(req.body.code && req.body.name && req.body.presentation && req.body.price && req.body.public_price 
           && req.body.existence && req.body.order && req.body.fixed_background){
        
            // Hacemos uso de parámetros en mayúsculas
            req.body.name = (req.body.name).toUpperCase();
            req.body.presentation = (req.body.presentation).toUpperCase();
            req.body.generic_compound = (req.body.generic_compound).toUpperCase();
            req.body.specs = (req.body.specs).toUpperCase();

            // Filtramos para verificar que no exista el código de barras 
            const filter_products = await Products.findOne({ where: { code: req.body.code } });
   
            if(!filter_products){
                return res.status(200).send(await Products.create(req.body));
            }else{
                return res.status(400).send('Existing product code');
            }
        }else{
            return res.status(400).send('Required parameters');
        }
            
    }catch(error){
        return res.status(500).send({
            error: error, 
            message: error.message
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
            return res.status(200).send(filter_products);
        }else{
            return res.status(404).send('Product not found');
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
         
            if(rows){
                const finish_page = Math.ceil((count/format_for_page));
                return res.status(200).send({ data: rows, finish_page: finish_page });
            }else{
                return res.status(404).send('Products not found');
            }

        }else{
       
            const { count, rows } = await Products.findAndCountAll({ order: [['id', 'DESC']], offset: offset, limit: format_for_page});
     
            if(rows){
                const finish_page = Math.ceil((count / format_for_page));
                return res.status(200).send({ data: rows, finish_page: finish_page });
            }else{
                return res.status(404).send('Products not found');
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
                    return res.status(404).send('Product not found');
                }else{
                    return res.status(200).send(await Products.findByPk(id));
                }
            }else{
                return res.status(400).send('Required parameters');
            }
        }else{
            return res.status(404).send('product not found');
        }
    }catch(error){
        return res.status(500).send({
            error: error, 
            message: error.message
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
            return res.status(200).send("Product deleted successfully");
        }else{
            return res.status(404).send('Product not found');
        }

    }catch(error){
        return res.status(500).send({
            error: error, 
            message: error.message
        });
    }
 }




