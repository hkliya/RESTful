var express = require('express');
var router = express.Router();
var productUtils = require('../utils/product-utils.js');

router.get('/:id', function (req, res) {
    productUtils.findProductById(parseInt(req.params.id), function (product) {
        if (product) {
            res.status(200).json(product);
        } else {
            res.sendStatus(404);
        }
    });
});

module.exports = router;