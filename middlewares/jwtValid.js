const { Users }=require('../models/index')

exports.isLogged = async function(req, res, next) {
    if(req.headers.authorization){
        var _token = req.headers.authorization.split(" ")[1];
        console.log(_token);
        // let _token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IkZhdHkiLCJpZCI6MzgsImlhdCI6MTYyMjI2MzgzMn0.F4qmAUPX2BabycyVWJfP0l7bFlDQViqcdhqzJRoxpuE";
        const tokenExist = await Users.findOne({ where: { token: _token } });
        if(tokenExist){
            console.log("Log...");
            next()
        }else{
            console.log("No log...");
            res.status(401).send({
                message: "No Autorizado"
            });
        }
    }else{
        res.status(401).send({
            message: "No Autorizado [No Bearer Token]"
        });
    }
}