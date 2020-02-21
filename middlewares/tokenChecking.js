const { verifyToken } = require('../helpers/jwt');
const User = require('../models/user');

function authentification(req,res,next) {
    if (req.headers.jwttoken) {       
        const decoded = verifyToken(req.headers.jwttoken)
        req.decoded = decoded;

        next();
    }else {
        res.status(404).json({message: 'You must login first as user'}); 
    };
};

function accountAuthorization(req,res,next) {
    let userId = req.decoded.id;
    let accountId = req.params.accountId;
    
    User.findOne({_id: userId})
        .then(function (user) {
            if (user.id !== userId) {
                next({message: `You don't have authorized to do that`})
            };
        })
        .catch(next);
}

module.exports = {
    authentification
};