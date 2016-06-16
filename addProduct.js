var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var productUtils = require('./product-utils.js');
var fs = require("fs");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/', function (req, res) {
    if (productUtils.isValid(req.body)) {
        productUtils.saveProduct(req.body, function(successful, product) {
            if (successful) {
                res.status(201).json(product);
            } else {
                res.status(500);
            }
        });
    } else {
        res.sendStatus(400);
    }
});

module.exports = router;