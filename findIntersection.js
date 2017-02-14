var venn = require('venn'),
    d3 = require('d3-dsv'),
    fs = require('fs');

var files = fs.readdirSync('./lists/');
var cols = files.map(function (file) {

    var fileText = fs.readFileSync("./lists/" + file, 'utf8');

    //remove zero width no break space from of csv (especially the beginning)
    var regEx = new RegExp(String.fromCharCode(65279), 'g');
    fileText = fileText.replace(regEx, '');

    var student = d3.csvParse(fileText);
    return student.columns;
});

var intersect = venn.create(cols.pop());
cols.forEach(function (col) {
    intersect.intersection(col);
});

console.log(intersect);
