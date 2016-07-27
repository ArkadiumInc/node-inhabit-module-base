/**
 * Created by daniil.kolesnik on 7/27/2016.
 */
var fs = require('fs'),
    path = require('path'),
    babel = require('babel-core'),
    config = require('../config');

fs.readdir(config.source, function (err, files) {
    files.forEach(buildFile);
});

function buildFile(filename) {
    var sourcepath = path.join(config.source, filename),
        destpath = path.join(config.destination, filename);

    console.log('Transforming file: ' + sourcepath);
    babel.transformFile(sourcepath, {}, function (err, result) {
        if (err) {
            throw Error(err);
        }

        fs.writeFile(destpath, result.code, function (err) {
            if (err) {
                throw Error(err);
            }

            console.log('Wrote ' + result.code.length + ' bytes to ' + destpath);
        })
    });
}