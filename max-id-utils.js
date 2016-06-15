var fs = require('fs');
var maxIdFile = './max-id.json';

function initMaxIdFile() {
    fs.stat(maxIdFile, function (err, stat) {
        var fileNotFound = !(stat && stat.isFile());
        if (fileNotFound) {
            initFile();
        }
    });
}

function initFile() {
    fs.open(maxIdFile, 'a+', function (err) {
        if (err) {
            console.error(err.stack());

            return;
        }
        writeId();
    });
}

function writeId() {

    var data = {"maxId": 0};

    fs.writeFile(maxIdFile, JSON.stringify(data), 'utf-8', function (err) {
        if (err) {
            console.error(err.stack);

        }
    });
}

module.exports.initMaxIdFile = initMaxIdFile;