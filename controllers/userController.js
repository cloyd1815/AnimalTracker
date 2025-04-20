const express = require('express');
const router = express.Router();

exports.index = (req, res, next) => {
    res.render('users', { title: 'Express' });
}