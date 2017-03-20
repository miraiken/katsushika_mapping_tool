import test from "ava";
const equal = require("equals");

const colorcvt = require("../modules/color_cvt.js");
const dataAnalyzer = require("../modules/data_analyzer");

const rgb = (r, g, b) => Object.freeze({"r": r, "g": g, "b": b});
const hls = (h, l, s) => Object.freeze({"h": h, "l": l, "s": s});

const makeTestCase = (source, expected) => Object.freeze({"source": source, "expected": expected});

test("dataAnalyzer.max", t => {
    const testCases = [
        makeTestCase([1, 2], 2),
        makeTestCase([-4, 2], 2),
        makeTestCase([-10, -1], -1),
    ];
    for(const testCase of testCases) {
        t.true(dataAnalyzer.max(testCase.source[0], testCase.source[1]) === testCase.expected);
        t.true(dataAnalyzer.max(testCase.source[0], testCase.source[1], (l, r) => l < r) === testCase.expected);
    }
});

test("dataAnalyzer.min", t => {
    const testCases = [
        makeTestCase([1, 2], 1),
        makeTestCase([-4, 2], -4),
        makeTestCase([-10, -1], -10),
    ];
    for(const testCase of testCases) {
        t.true(dataAnalyzer.min(testCase.source[0], testCase.source[1]) === testCase.expected);
        t.true(dataAnalyzer.min(testCase.source[0], testCase.source[1], (l, r) => l < r) === testCase.expected);
    }
});

test("dataAnalyzer.maxElements", t => {
    const testCases = [
        makeTestCase([3, 7, 5, 4, 1, 7, 6, 1], [{"index": 1, "value": 7}, {"index": 5, "value": 7}]),
        makeTestCase([3, -7, 5, 4, 1, 7, 6], [{"index": 5, "value": 7}]),
    ];
    for(const testCase of testCases) {
        t.true(equal(testCase.expected, dataAnalyzer.maxElements(testCase.source)));
        t.true(equal(testCase.expected, dataAnalyzer.maxElements(testCase.source, (l, r) => l < r)));
    }
});

test("dataAnalyzer.minElements", t => {
    const testCases = [
        makeTestCase([3, 7, 5, 4, 1, 7, 6, 1], [{"index": 4, "value": 1}, {"index": 7, "value": 1}]),
        makeTestCase([3, -7, 5, 4, 1, 7, 6], [{"index": 1, "value": -7}]),
    ];
    for(const testCase of testCases) {
        t.true(equal(testCase.expected, dataAnalyzer.minElements(testCase.source)));
        t.true(equal(testCase.expected, dataAnalyzer.minElements(testCase.source, (l, r) => l < r)));
    }
});

test("dataAnalyzer.maxElement", t => {
    const testCases = [
        makeTestCase([3, 7, 5, 4, 1, 7, 6, 1], {"index": 1, "value": 7}),
        makeTestCase([3, -7, 5, 4, 1, 7, 6], {"index": 5, "value": 7}),
    ];
    for(const testCase of testCases) {
        t.true(equal(testCase.expected, dataAnalyzer.maxElement(testCase.source)));
        t.true(equal(testCase.expected, dataAnalyzer.maxElement(testCase.source, (l, r) => l < r)));
    }
});

test("dataAnalyzer.minElement", t => {
    const testCases = [
        makeTestCase([3, 7, 5, 4, 1, 7, 6, 1], {"index": 4, "value": 1}),
        makeTestCase([3, -7, 5, 4, 1, 7, 6], {"index": 1, "value": -7}),
    ];
    for(const testCase of testCases) {
        t.true(equal(testCase.expected, dataAnalyzer.minElement(testCase.source)));
        t.true(equal(testCase.expected, dataAnalyzer.minElement(testCase.source, (l, r) => l < r)));
    }
});

test("dataAnalyzer.convertToPercentage", t => {
    const arr = [0, 25, 47, 50, 87, 100];
    t.true(equal(arr, dataAnalyzer.convertToPercentage(arr)));
});

test("rgb2hls", t => {
    const testCases = [
        makeTestCase(rgb(0, 0, 0), hls(0, 0, 0)),
        makeTestCase(rgb(255, 0, 0), hls(0, 50, 100)),
        makeTestCase(rgb(0, 255, 0), hls(120, 50, 100)),
        makeTestCase(rgb(0, 0, 255), hls(240, 50, 100)),
        makeTestCase(rgb(127, 0, 0), hls(0, 24, 100)),
        makeTestCase(rgb(0, 127, 0), hls(120, 24, 100)),
        makeTestCase(rgb(0, 0, 127), hls(240, 24, 100)),
        makeTestCase(rgb(150, 81, 77), hls(3, 44, 32)),
    ];

    for(const testCase of testCases) {
        const actual = colorcvt.rgb2hsl(testCase.source);
        t.true(Math.abs(actual.h - testCase.expected.h) < 1);
        t.true(Math.abs(actual.l - testCase.expected.l) < 1);
        t.true(Math.abs(actual.s - testCase.expected.s) < 1);
    }
});

// test("hls2rgb", t => {
//     const testCases = [
//         makeTestCase(hls(0, 0, 0), rgb(0, 0, 0)),
//         makeTestCase(hls(0, 50, 100), rgb(255, 0, 0)),
//         makeTestCase(hls(120, 50, 100), rgb(0, 255, 0)),
//         makeTestCase(hls(240, 50, 100), rgb(0, 0, 255)),
//         makeTestCase(hls(0, 24, 100), rgb(127, 0, 0)),
//         makeTestCase(hls(120, 24, 100), rgb(0, 127, 0)),
//         makeTestCase(hls(240, 24, 100), rgb(0, 0, 127)),
//         makeTestCase(hls(3, 44, 32), rgb(150, 81, 77)),
//     ];

//     for(const testCase of testCases) {
//         // const actual = colorcvt.hls2rgb(testCase.source);
//         const actual = colorcvt.hls2rgbkai(testCase.source);
//         t.true(Math.abs(actual.r - testCase.expected.r) < 1);
//         t.true(Math.abs(actual.g - testCase.expected.g) < 1);
//         t.true(Math.abs(actual.b - testCase.expected.b) < 1);
//     }
// });
