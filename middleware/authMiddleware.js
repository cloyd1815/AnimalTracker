const User = require('../models/user.js');
const jwt = require('jsonwebtoken');

exports.authentication = async (req, res, next) => {
    try {
        if(!req.headers.authorization) throw {name : "Invalid token"}
        let [type, token] = req.headers.authorization.split(" ")
        if(type !== "Bearer") throw {name : "Invalid token"}
        let payload =  jwt.verify(token, "secret")
        if(!payload) throw {name : "Invalid token"}
        let user = await User.findByPk(payload.id)
        if(!user) throw {name : "Invalid token"}
        req.user = {
            id : user.id
        }
        next()
    } catch (error) {
        next(error)
    }
}