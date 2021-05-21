const models = require('../models')
require('dotenv').config();

 exports.save =async function(req,res){
  /*  const body = {
        code: req.body.code,
        name: req.body.name,
        generic_compound: req.body.generic_compound,
        specs: req.body.specs,
        presentation: req.body.presentation,
        price: req.body.price,
        public_price: req.body.public_price,
        existence: req.body.existence,
        order: req.body.order,
        fixed_background: req.body.fixed_background
    }
*/

const body = {
    code: "slasdpp.00",
    name: "Next",
    generic_compound: "Paracetamol y otro",
    specs: "Paracetamol del weno",
    presentation: "Tabletas",
    price: 12,
    public_price: 16,
    existence: 15,
    order: 10,
    fixed_background: 5
}
    console.log(body);

    /*
        models.Products.create(body).then(response =>{
            res.status(201).json({
                message: "Creación de producto exitosa",
                body: response
            });
        }).catch(error =>{
            res.status(500).json({
                message: "Error en la creación del producto",
                error: error
            });
        });  
    */

};



