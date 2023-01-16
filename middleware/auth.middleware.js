const jwt = require("jsonwebtoken");

const authenticate=(req,res,next)=>{
    const token = req.headers.authorization
    if(token){
        const decoded = jwt.verify(token,"masai")
        if(decoded){
            req.body.username = decoded.iat
            next()
        }
        else{
            res.send("Pleeeease  LOGIN")
        }
    }
    else{
        res.send("Pleeeease  LOGIN")
    }
}

module.exports = authenticate

