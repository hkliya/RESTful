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

function deleteProduct(id, callback) {
    readProducts(function(successfully, products) {
        var i = 0;
        for (i; i < products.length; i++) {
            if (products[i].id === id) {
                products.splice(i, 1);
                writeProducts(products, callback);
                return;
            }
        }
        callback(false);
    });
}

function findProductById(id, callback) {
    readProducts(function (successfully, products) {
        if (successfully) {
            var product = products.find(function (product) {
                return product.id === id;
            });
            
            callback(product);
        } else {
            callback(false);
        }
    });
}

module.exports.addProduct = addProduct;
module.exports.deleteProduct = deleteProduct;
module.exports.readProducts = readProducts;
module.exports.findProductById = findProductById;
