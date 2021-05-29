
const { Users }=require('../models/index')

exports.isLogged = async function(req, res, next) {
    let _token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6IlBhY28iLCJpZCI6MzIsImlhdCI6MTYyMjI2MjI5NH0.GrxJZmfeR8i8Vf_kDqLjD3QUa5_7oe5XYjUSHrHnseI";
    const tokenExist = await Users.findOne({ where: { token: _token } });
    console.log("********************")
    console.log(tokenExist);
    if(tokenExist){
        console.log("Log...");
        next()
    }else{
        console.log("No log...");
        next()
    }
}