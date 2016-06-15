var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fs = require('fs');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.put('/products/:id', function (req, res) {
    fs.readFile('./products.json', 'utf-8', function (err, data) {
        if (err) {
            console.error(err.stack);
            res.status(500);

            return;
        }

        data = JSON.parse(data);
        updataProduct(data, req, res);
    });
});

function updataProduct(data, req, res) {
    var product = req.body;

    if (isExist(product) && isRight(product)) {
        getNewProduct(data, product, req, res);
    }
    else {

        res.sendStatus(400);
    }
}

function getNewProduct(data, product, req, res) {
    for (var i = 0; i < data.length; i++) {

        if (data[i].id === parseInt(req.params.id)) {

            data[i].barcode = product.barcode;
            data[i].name = product.name;
            data[i].unit = product.unit;
            data[i].price = product.price;

            res.status(201).json(data[i]);
            writeFile(data, res);

            return;
        }
    }
    res.sendStatus(404);
}


function isExist(product) {
    if ((product.hasOwnProperty("barcode")) && (product.hasOwnProperty("name")) && ( product.hasOwnProperty("unit")) && (product.hasOwnProperty("price"))) {

        return true;
    }

    return false;
}

function isRight(product) {
    if ((typeof(product.barcode) != 'string') || (typeof(product.name) != "string") || (typeof(product.unit) != "string") || (typeof(product.price) != "number")) {

        return false;
    }

    return true;

}

function writeFile(data, res) {
    fs.writeFile('./products.json', JSON.stringify(data), function (err) {
        if (err) {
            res.sendStatus(404);
        }
    });
}

module.exports = router;
