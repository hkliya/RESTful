var express = require('express');
var router = express.Router();
var productUtils = require('../utils/product-utils.js');

router.get('/', function (req, res) {
    productUtils.readProducts(function (successfully, products) {
        if (successfully) {
            res.status(200).json(products);
        } else {
            res.status(500);
        }
    });
});

module.exports = router;
