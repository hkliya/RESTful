var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require("fs");
var maxIdUtils = require('./max-id-utils.js');

maxIdUtils.initMaxIdFile();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/products', function (req, res) {

    fs.readFile('./products.json', 'utf-8', function (err, fileContent) {
        if (err) {
            res.status(500).end();

            return;
        }

        var data = JSON.parse(fileContent);

        getInputProduct(data, req, res);
    });
});

function getInputProduct(data, req, res) {

    var product = req.body;

    if (isExist(product) && isRight(product)) {

        addProduct(data, product, res);
    }
    else {

        res.sendStatus(400);
    }
}

function isExist(product) {

    return product.hasOwnProperty("barcode") &&
        product.hasOwnProperty("name") &&
        product.hasOwnProperty("unit") &&
        product.hasOwnProperty("price");


}

function isRight(product) {

    return (typeof(product.barcode) != 'string') ||
        (typeof(product.name) != "string") ||
        (typeof(product.unit) != "string") ||
        (typeof(product.price) != "number");
}

function addProduct(productsData, product, res) {

    fs.readFile('./max_id.json', 'utf-8', function (err, data) {
        if (err) {
            res.sendStatus(500);

            return;
        }

        data = JSON.parse(data);

        data.maxId++;

        writeMaxId(data, res);

        var maxId = data.maxId;
        var item = {
            "id": maxId,
            "barcode": product.barcode,
            "name": product.name,
            "unit": product.unit,
            "price": product.price
        };
        productsData.push(item);

        writeFile(productsData, res);
    });
}

function writeMaxId(data, res) {

    fs.writeFile('./max_id.json', JSON.stringify(data), function (err) {
        if (err) {

            res.sendStatus(500);

            return;
        }

        return;
    });
}

function writeFile(productsData, res) {

    fs.writeFile('./products.json', JSON.stringify(productsData), function (err) {
        if (err) {

            res.status(404);

            return;
        }
        res.status(201).json(productsData[productsData.length - 1]);
    });
}

module.exports = router;