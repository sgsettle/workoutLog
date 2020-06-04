const jwt = require('jsonwebtoken');
const User = require('../db').import('../models/user');

const validateSession = (req, res, next) => {
    if(req.method == 'OPTIONS') {
        next();
    } else {
    const token = req.headers.authorization;
    console.log(token)

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if(!err && decoded){
            console.log("here")
            User.findOne({
                where: {
                    id: decoded.id
                }
            }, console.log(decoded))
            .then(user => {
                if(!user) throw 'err'
                req.user = user;

                next();
            })
            .catch(err => next(err))
        } else {
            console.log(err)
            req.errors = err;
            return res.status(500).send('Not authorized')
        }
    })
}
}

module.exports = validateSession;