const express = require("express");
const router = express.Router();

const homeController =require('../controllers/homeController.js');
const userController =require('../controllers/userController.js');


router.get('/', homeController.index);
router.get('/users', userController.index);

module.exports = router;
