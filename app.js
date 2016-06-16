var express = require('express');
var app = express();
var productUtils = require('./product-utils.js');
var maxIdUtils = require('./max-id-utils.js');
const components = [
    'getOneProduct',
    'getAllProducts',
    'addProduct',
    'deleteProduct',
    'updateProducts'
];

maxIdUtils.initMaxIdFile();
productUtils.initProductsFile();

components.forEach(function (component) {
    app.use('/products', require('./' + component + '.js'));
});

app.listen(8010, function () {
    console.log('server start');
});
