var express = require('express');
var app = express();
var products = require('./products.js');
var maxIdUtils = require('./max-id-utils.js');
const components = [
    'getOneProduct',
    'getAllProducts',
    'addProduct',
    'deleteProduct',
    'updataProducts'
];

maxIdUtils.initMaxIdFile();

components.forEach(function (component) {
    app.use('/products', require('./' + component + '.js'));
});

app.listen(8010, function () {
    console.log('server start');
});
