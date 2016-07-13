var Tokenizer = require('./tokenizer').Tokenizer;


var langs = {
    abap: 1,
    abc: 1,
    actionscript: 1,
    ada: 1,
    apache: 1,
    applescript: 1,
    asciidoc: 1,
    assembly_x86: 1,
    batchfile: 1,
    c9search: 1,
    cirru: 1,
    clojure: 1,
    cobol: 1,
    coffee: 1,
    coldfusion: 1,
    csharp: 1,
    css: 1,
    curly: 1,
    c_cpp: 1,
    d: 1,
    dart: 1,
    diff: 1,
    django: 1,
    dockerfile: 1,
    doc_comment: 1,
    dot: 1,
    drools: 1,
    eiffel: 1,
    ejs: 1,
    elixir: 1,
    elm: 1,
    erlang: 1,
    forth: 1,
    fortran: 1,
    ftl: 1,
    gcode: 1,
    gherkin: 1,
    gitignore: 1,
    glsl: 1,
    gobstones: 1,
    golang: 1,
    groovy: 1,
    haml: 1,
    handlebars: 1,
    haskell: 1,
    haskell_cabal: 1,
    haxe: 1,
    html: 1,
    html_elixir: 1,
    html_ruby: 1,
    ini: 1,
    io: 1,
    jack: 1,
    jade: 1,
    java: 1,
    javascript: 1,
    json: 1,
    jsp: 1,
    jsx: 1,
    js_regex: 1,
    julia: 1,
    latex: 1,
    less: 1,
    liquid: 1,
    lisp: 1,
    logiql: 1,
    lsl: 1,
    lua: 1,
    luapage: 1,
    lucene: 1,
    makefile: 1,
    markdown: 1,
    mask: 1,
    matlab: 1,
    maze: 1,
    mel: 1,
    mushcode: 1,
    mysql: 1,
    nix: 1,
    nsis: 1,
    objectivec: 1,
    ocaml: 1,
    pascal: 1,
    perl: 1,
    pgsql: 1,
    php: 1,
    powershell: 1,
    praat: 1,
    prolog: 1,
    properties: 1,
    protobuf: 1,
    python: 1,
    r: 1,
    razor: 1,
    rdoc: 1,
    rhtml: 1,
    rst: 1,
    ruby: 1,
    rust: 1,
    sass: 1,
    scad: 1,
    scala: 1,
    scheme: 1,
    scss: 1,
    sh: 1,
    sjs: 1,
    smarty: 1,
    snippets: 1,
    soy_template: 1,
    space: 1,
    sql: 1,
    sqlserver: 1,
    stylus: 1,
    svg: 1,
    swift: 1,
    tcl: 1,
    tex: 1,
    text: 1,
    textile: 1,
    toml: 1,
    twig: 1,
    typescript: 1,
    vala: 1,
    vbscript: 1,
    velocity: 1,
    verilog: 1,
    vhdl: 1,
    wollok: 1,
    xml: 1,
    yaml: 1
};


var alias = {
    js: 'javascript',
    ts: 'typescript',
    c: 'c_cpp',
    cpp: 'c_cpp',
    'c++': 'c_cpp',
};
exports.alias = alias;


function tokenize(str, lang, callback) {
    if(!langs[lang]) return null;

    var Rules = require('./rules/' + lang + '.js');
    try {
        var tokenizer = new Tokenizer(new Rules);
        var result = tokenizer.getLineTokens(str).tokens;
        callback(null, result);
    } catch(err) {
        callback(err);
    }
}
exports.tokenize = tokenize;


function toJml(tokens, opts) {
    className = opts.className || 'class';
    classPrefix = opts.classPrefix || 'hl-';

    var list = [];
    var pos = 0;
    for(var i = 0; i < tokens.length; i++) {
        var token = tokens[i];
        var value = token.value;
        var types = token.type.split('.');
        // var attributes = {'data-pos': pos + ',' + (pos + value.length)};
        var attributes = {'data-pos': pos};
        attributes[className] = classPrefix + types.join(' ' + classPrefix)
        list.push(['span', attributes, value]);
        pos += value.length;
    }
    return list;
}
exports.toJml = toJml;


function highlight(str, lang, opts, callback) {
    lang = alias[lang] || lang;
    tokenize(str, lang, function(err, tokens) {
        if(err) return callback(err);

        var jml;
        if(tokens) jml = toJml(tokens, opts);
        else jml = toJml([{type: 'text', value: str}], opts);

        callback(null, jml);
    });
}
exports.highlight = highlight;
