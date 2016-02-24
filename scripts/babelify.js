var fs = require('fs');
var path = require('path');
var babel = require('babel-core');

var babelOptions = {
    "presets": [
        "es2015",
        "stage-0",
        "react"
    ],
    "plugins": [
        "add-module-exports",
        "transform-class-properties",
        "transform-decorators-legacy",
        "transform-proto-to-assign",
        ["transform-es2015-classes", {"loose": true}]

    ],
    sourceMaps: 'inline'
};

var walk = function(dir) {
    var files = [];
    var list = fs.readdirSync(dir);
    list.forEach(function(file) {
        file = dir + '/' + file;
        var stat = fs.statSync(file);
        if (stat && stat.isDirectory()) files = files.concat(walk(file));
        else files.push(file);
    });
    return files;
};

var filterFiles = function(files) {
    return files.filter(function(file) {
        return (!file.match(/(example|__tests__)/) && file.match(/\.js$/));
    });
};

function ensureDirectoryExistence(filePath) {
    var dirname = path.dirname(filePath);
    if (fs.existsSync(dirname)) {
        return true;
    }
    ensureDirectoryExistence(dirname);
    fs.mkdirSync(dirname);
}

var files = filterFiles(walk('./src'));
files.forEach(function(file) {
    babel.transformFile(file, babelOptions, function(err, result) {
        if (err) console.error(err);
        var newFile = file.replace('./src', '.');
        ensureDirectoryExistence(newFile);
        fs.writeFile(newFile, result.code, function(err) {
            if (err) console.error(err);
            console.log('Babelified ' + file);
        });
    });
});
