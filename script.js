const SVG = require("svg.js");
const csvParse = require("csv-parse");
const csvParseAsync = (input, options) => new Promise((resolve, reject) => {
    csvParse(input, options, (err, output) => {
        if(err) {
            reject(err);
        } else {
            resolve(output);
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const inputBox = document.getElementById("input_box");
    const convertButton = document.getElementById("convert");
    convertButton.addEventListener("click", () => {
        csvParseAsync(inputBox.value, {delimiter: "\t"})
        .then(output => {
            for(const i of output) {
                i[1] = Number.parseInt(i[1], 10);
            }
            return output;
        })
        .then(data => {
            console.log(JSON.stringify(data, null, "\t"));// eslint-disable-line no-console
        })
        .catch(err => {
            throw err;
        });
    });
    const draw = SVG("drawing").size(300, 300);// eslint-disable-line new-cap
    draw.rect(100, 100).attr({fill: "#f06"});
});
