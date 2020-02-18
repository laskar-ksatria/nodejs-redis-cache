const User = require('../models/user');
const { checkPass } = require('../helpers/hashPassword');
const { generateToken } = require('../helpers/jwt');

class UserController {

    static readAll(req,res,next) {
        User.find({})
            .then(function (users) {
                res.status(200).json(users)
            })
            .catch(next);
    };

    static create(req,res,next) {
        let { name, email, password, confirm_password } = req.body;
        if (confirm_password !== password) {
            next({message: "Confirm Password doesn't match with passowrd"})
        }else {

            User.create({
                name,
                email,
                password
            })
            .then(function(user) {
                res.status(202).json(user)
            })
            .catch(next);
        };

    };

    static login(req,res,next) {
        let { email, password } = req.body;
        User.findOne({
            email
        })
        .then(function (user) {
            if (user) {
                let passwordChecking = checkPass(password, user.password);
                if (passwordChecking) {
                    let payload = {
                        id: user.id,
                        email: user.email,
                    }
                    let token = generateToken(payload);
                    res.status(201).json({message: `Welcome ${user.name}, hope you have a nice day`, token})
                }else {
                    next({message: 'Invalid email / password'})
                }
            }else {
                next({message: 'Invalid email / password'})
            }
        })
    };

};


module.exports = UserController;