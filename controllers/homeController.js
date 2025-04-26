const express = require('express');
const router = express.Router();

exports.index = (req, res, next) => {
    res.render('index', { title: 'Express' });
}

exports.login = (req, res, next) => {
    res.render('login', { title: 'Login' })
}