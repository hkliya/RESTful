var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var productUtils = require('./product-utils.js');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true}));

router.put('/:id', function (req, res) {
    var product = req.body;
    if (productUtils.isValid(product)) {
        const id = parseInt(req.params.id);
        productUtils.findProductById(id, function (oldProduct) {
            if (oldProduct) {
                product.id = id;
                productUtils.updateProduct(product, function (successfully) {
                    if (successfully) {
                        res.sendStatus(201);
                    } else {
                        res.sendStatus(500);
                    }
                });
            } else {
                res.sendStatus(404);
            }
        });
    } else {
        res.sendStatus(400);
    }
    
});

module.exports = router;
