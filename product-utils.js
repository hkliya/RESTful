var fs = require('fs');
var maxIdUtils = require('./max-id-utils.js');
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

function saveProduct(product, callback) {
    maxIdUtils.updateMaxId(function (successfully, id) {
        if (successfully) {
            product.id = id;
            addProduct(product, callback);
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

function updateProduct(product, callback) {
    deleteProduct(product.id, function(successful) {
        if (successful) {
            addProduct(product, callback);
        } else {
            callback(false);
        }
    });
}

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

function initProductsFile() {
    fs.stat(productFile, function (err, stat) {
        if (stat && stat.isFile()) {
            console.log("Product file already exists.")
            return;
        } else {
            createAndWriteEmptyArray();
        }
    });
}

function createAndWriteEmptyArray() {
    fs.open(productFile, 'a+', function (err, file) {
        console.log(file);
        if (err) {
            console.log("Product file can not been created:");
            console.error(err.stack);
        } else {
            writeProducts([], function (successfully) {
                if (successfully) {
                    console.log("Product file initialized.");
                } else {
                    console.log("Product file initialize failed.");
                }
            })
        }
    });
}

module.exports = {
    saveProduct: saveProduct,
    deleteProduct: deleteProduct,
    readProducts: readProducts,
    findProductById: findProductById,
    updateProduct: updateProduct,
    isValid: isValid,
    initProductsFile: initProductsFile
}