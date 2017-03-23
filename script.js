const SVG = require("svg.js");

document.addEventListener("DOMContentLoaded", () => {
    const draw = SVG("drawing").size(300, 300);// eslint-disable-line new-cap
    draw.rect(100, 100).attr({fill: "#f06"});
});
