var fs = require('fs');
const productFile = './products.json';

function addProduct(product, callback) {
    readProducts(function(successfully, products) {
        if (successfully) {
            products.push(product);
            writeProducts(products, callback);
        } else {
            callback(false);
        }
    });
}

function readProducts(callback) {
    fs.readFile(productFile, 'utf-8', function (err, fileContent) {
        if (err) {
            callback(false);
        } else {
            callback(true, JSON.parse(fileContent));
        }
    });
}

function writeProducts(products, callback) {
    fs.writeFile(productFile, JSON.stringify(products), function (err) {
        if (err) {
            callback(false);
        } else {
            callback(true, products[products.length - 1]);
        }
    });
}

module.exports.addProduct = addProduct;
