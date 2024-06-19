const express = require('express');
const router = express.Router();
const cartController = require("../controllers/cart");
const { checkIsLogged } = require('../middleware');


router.get("/", checkIsLogged , cartController.cart)

module.exports = router;