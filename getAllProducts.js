var express = require('express');
var router = express.Router(); //构造函数，生成路由实例
var fs = require('fs');

router.get('/', function (req, res) {

    fs.readFile('./products.json', 'utf-8', function (err, data) {
        if (err) {
            console.error(err.stack);
            res.status(500);

            return;
        }

        data = JSON.parse(data);
        res.status(200).json(data);
    });
});

module.exports = router;
