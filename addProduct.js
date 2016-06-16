var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var maxIdUtils = require('./max-id-utils.js');
var productUtils = require('./product-utils.js');
var fs = require("fs");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/', function (req, res) {
    if (isValid(req.body)) {
        console.log(req.body);
        saveProduct(req.body, function(successful, product) {
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

function isValid(product) {
    return hasProperties(product) && hasRightType(product);
}

function hasProperties(product) {

    return product.hasOwnProperty("barcode") &&
        product.hasOwnProperty("name") &&
        product.hasOwnProperty("unit") &&
        product.hasOwnProperty("price");


}

function hasRightType(product) {
    return typeof product.barcode == 'string' 
        && typeof product.name == "string" 
        && typeof product.unit == "string" 
        && typeof product.price == "number";
}

function saveProduct(product, callback) {
    maxIdUtils.updateMaxId(function (successfully, id) {
        if (successfully) {
            product.id = id;
            productUtils.addProduct(product, callback);
        } else {
            callback(false);
        }
    });
}

module.exports = router;