var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require("fs");

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.post('/', function (req, res) {

    fs.readFile('./products.json', 'utf-8', function (err, fileContent) {
        if (err) {
            res.status(500).end();

            return;
        }

        var data = JSON.parse(fileContent);

        if (isValid(req.body)) {
            addProduct(data, req.body, res);
        }
        else {
            res.sendStatus(400);
        }
    });
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

function addProduct(productsData, product, res) {

    fs.readFile('./max-id.json', 'utf-8', function (err, data) {
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

    fs.writeFile('./max-id.json', JSON.stringify(data), function (err) {
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