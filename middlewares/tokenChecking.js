const { verifyToken } = require('../helpers/jwt');

function authentification(req,res,next) {
    if (req.headers.jwttoken) {       
        const decoded = verifyToken(req.headers.jwttoken)
        req.decoded = decoded;
        next();
    }else {
        res.status(404).json({message: 'You must login first as user'}); 
    }
};

module.exports = {
    authentification
};