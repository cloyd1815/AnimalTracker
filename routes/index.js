const express = require("express");
const router = express.Router();

const homeController =require('../controllers/homeController.js');
const userController =require('../controllers/userController.js');


router.get('/', homeController.index);
router.get('/users', userController.index);
router.get('/login', homeController.login);
router.post('/login', userController.login);

module.exports = router;
