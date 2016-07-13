
var lib = require('./index');


var css = '{\n' +
    'border: 1px solid red;\n' +
    '}\n';

var js = 'function hello() {\n' +
    'console.log("Hello world");\n' +
    '}\n\n' +
    'hello();';

var html = '<div class="text"><a href="#asdf">Click me</a>';

var json = '{"key": "value"}';

// lib.highlight(json, 'json', {}, function(err, jml) {
lib.highlight(js, 'js', {}, function(err, jml) {
    console.log(jml);
});


