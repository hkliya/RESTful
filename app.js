var express = require('express');
var app = express();
var products = require('./products.js');

app.use('/', require('./getOneProduct.js'));
app.use('/', require('./getAllProducts.js'));
app.use('/', require('./addProduct.js'));
app.use('/', require('./deleteProduct.js'));
app.use('/', require('./updataProducts.js'));

app.listen(8010, function () {
    console.log('server start');
});
