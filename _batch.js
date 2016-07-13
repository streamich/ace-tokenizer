var fs = require('fs');

var dir = __dirname + '/rules';
var files = fs.readdirSync(dir);


function adapt(text) {
    text = text.replace('require("../lib/oop")', 'require("../oop")');
    text = text.replace('require("../lib/lang")', 'require("../lang")');
    text = text.replace(/define\(function\(require, exports, module\) \{/, '');
    text = text.replace(/require\(\"\.\/([a-zA-Z_]+)_highlight_rules\"\)\.[a-zA-Z]+/g, function(m, file) {
        return 'require("./' + file + '")';
    });
    text = text.replace('"use strict";', '');
    text = text.replace(/exports\.[a-zA-Z]+ /, 'module.exports ');

    var pos = text.lastIndexOf('});');
    text = text.substring(0, pos);

    return text;
}


for(var i = 0; i < files.length; i++) {
    var file = files[i];
    if(file.indexOf('_highlight_rules') > -1) {
        var text = adapt(fs.readFileSync(dir + '/' + file).toString());
        var newname = file.replace('_highlight_rules', '');
        fs.writeFile(dir + '/' + newname, text);
        fs.unlink(dir + '/' + file);
    }
}

var file = __dirname + '/rules/groovy_highlight_rules.js';


var files = fs.readdirSync(dir);
for(var i = 0; i < files.length; i++) {
    var file = files[i];
    console.log("" + file.replace('.js', '') + ": 1,");
}