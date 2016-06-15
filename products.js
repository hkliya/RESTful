var fs = require('fs');

fs.stat('./products.json', function (err, stat) {
    if (stat && stat.isFile()) {

        return;
    } else {

        openFile();
    }
});

function openFile() {

    fs.open('./products.json', 'a+', function (err, fd) {

        fs.write(fd, "[]", 0, 'utf-8', function (err) {
            if (err) {
                console.error(err.stack);
            }
        });
    });
}
