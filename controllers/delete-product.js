var express = require('express');
var router = express.Router();
var productUtils = require('./../utils/product-utils.js');

router.delete('/:id', function (req, res) {
    productUtils.deleteProduct(parseInt(req.params.id), function(successfully) {
        if (successfully) {
            res.sendStatus(200);
        } else {
            res.sendStatus(404);
        }
    });
});

module.exports = router;