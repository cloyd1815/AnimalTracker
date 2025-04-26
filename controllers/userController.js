const User = require('../models').User;
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//get
exports.index = (req, res, next) => {
    res.render('users', { title: 'Express' });
}

//post
exports.register = async (req, res, next) => {
    const {email, password, name, phone} = req.body;
    try {
      const user = await User.findOne({where: [ {email} ]});
      if(user) {
        return res.status(422)
        .send({message: 'User with that email or phone already exists'});
      }
      await User.create({
        name,
        email,
        password : bcrypt.hashSync(password),
        phone,
      });
      return res.status(201).send({message: 'Account created successfully'});
    } catch(e) {
      console.log(e);
      return res.status(500)
      .send(
        {message: 'Could not perform operation at this time, kindly try again later.'});
    }
}

exports.login = async (req, res, next) => {
    try {
        let {email, password} = req.body
        if(!email) throw {name : "Email is required"}
        if(!password) throw {name : "Password is required"}
        let user = await User.findOne({where : {email}})
        if(!user) throw {name : "Invalid email/password"}
        let valid = compare(password, user.password)
        if(!valid) throw {name : "Invalid email/password"}
        let access_token = jwt.sign({id : user.id}, "secret")
        res.status(200).json({access_token})
        res.render('index', {title: access_token});
    } catch (error) {
        next(error)
    }
}