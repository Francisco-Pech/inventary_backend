const { Users }=require('../models/index')

exports.isLogged = async function(req, res, next) {
    if(req.headers.authorization){
        var _token = req.headers.authorization.split(" ")[1];
        const tokenExist = await Users.findOne({ where: { token: _token } });
        if(tokenExist){
            next()
        }else{

            res.status(401).send({
                data: {},
                message: [{ msg: "No Autorizado" }],
                success: false
            });
        }
    }else{
        res.status(401).send({
            data: {},
            message: [{ msg: "Falta cabecera de autentificación [Bearer Token]" }],
            success: false
        });
    }
}