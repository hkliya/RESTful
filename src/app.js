var express = require('express');
var app = express();
var productUtils = require('./utils/product-utils.js');
var maxIdUtils = require('./utils/max-id-utils.js');

var components = [
    'get-one-product',
    'get-all-products',
    'add-product',
    'delete-product',
    'update-products'
];

components.forEach(function (component) {
    app.use('/products', require('./controllers/' + component + '.js'));
});

maxIdUtils.initMaxIdFile();
productUtils.initProductsFile();

app.listen(8010, function () {
    console.log('server start');
});
