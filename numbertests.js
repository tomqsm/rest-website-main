var fs = require('fs');
var util = require('util');
var basePath = 'src/main/webapp/static/js/',
        fileNames = [],
        filePath = '',
        testslister;

testslister = [
    basePath + 'menuAppTests.js',
]

// copy from arguments lists file names provided (in this setting they are listed in build.xml)
var params = process.argv, counter = 0;
for (var i = 2; i < params.length; i++) {
    fileNames[counter++] = process.argv[i];
}

var numberit = function(filePath) {
    fs.readFile(filePath, function(err, data) {
        if(err) throw err;
        var text = data.toString(), counter = 1, output = '';
        // split by line
        var lines = text.split(/\n+/);
        // finds test with zero or more spaces \s* then bracket and \s* afer (
        // ^ assures the line starts with word test, bypasses comments
        // (?:#\d) is a non capturing group i.e. does not retrurn matches to result array
        // ((?:#\d\s)*) the bracket around the non-capturing group capture its result
        // otherwise if the inner group were not non-capturing, the result would be duplicated
        var testRegEx = /^(\s*test\s*\(\s*')((?:#\d\s)*)/g;
        lines.forEach(function(line) {
            if (line.search(testRegEx) != -1) {
                // notation $1 referes to the first caturing group i.e. 
                line = line.replace(testRegEx, '$1#' + counter++ + ' ');
                line += '\n';
            } else if (line === '{') {
                line += '\n';
            } else if (line === '}') {
                line += '\n';
            } else if (line.indexOf(';') != -1) {
                line += '\n';
            } else {
                line += '\n';
            }
            output += line;
        });
        fs.writeFile(filePath, output);
    });
};
if (params) {
    util.log('running numbering of tests in files specified in build.xml:');
    fileNames.forEach(function(n) {
        util.log(basePath + n);
        numberit(basePath + n);
    });
} else {
    util.log('running numbering of tests in files specified in the .js file');
    testslister.forEach(function(path) {
        util.log('setting tests number in: ' + path);
        numberit(path);
    });
}

//    var regex = /(module(?:.*\n[^}]+)+(?:}\n}\);))/g;
//    var regex = /\w+(\.\w+)+/g;
//matched: app.Utils.callback
//matched: .callback
//var text = 'This is my text. Another text.';
//from JavaScript The Good Parts Douglas Crockford
//var regex = /([A-Za-z\u00C0-\u1FFF\u2800-\uFFFD]+)\s+\1/gi;
//^ indicates the beginning of the string , it is an anchor  that prevents exec from skipping over (starts with)
//.{1,3}\s match any character will be matched 1 or 2 or 3 times followed by space \s
// $ marks the end of the string, assures there was no extra material after the last group (ends with)

//var regex = /^(.{1,3}s\s)(.+\.\s)/;
//
//var match = regex.exec(text);
//
//console.log('found: ' + match.length);
//console.log('matched: ' + match[0]);
//for( var i=1; i < match.length; i++){
//    console.log(i + ') ' + match[i]);
//}
//var modifiedText = match[1] + ' my intrussion ' + match[2];
//
//console.log('modified: ' + modifiedText);