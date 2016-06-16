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

function readMaxId(callback) {
    fs.readFile('./max-id.json', 'utf-8', function (err, fileContent) {
        if (err) {
            callback(false);
            return;
        }

        var data = JSON.parse(fileContent);
        callback(true, data.maxId);
    })
}

function writeMaxId(id, callback) {
    fs.writeFile('./max-id.json', JSON.stringify({"maxId": id}), function (err) {
        if (err) {
            callback(false);
            return;
        }

        callback(true, id);
    });
}

function updateMaxId(callback) {
    readMaxId(function (successfully, id) {
        if (successfully) {
            writeMaxId(id + 1, callback);
        } else {
            callback(false);
        }
    });
}


module.exports.initMaxIdFile = initMaxIdFile;
module.exports.updateMaxId = updateMaxId;