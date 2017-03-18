import test from "ava";
const colorcvt = require("../modules/color_cvt.js");

const rgb = (r, g, b) => Object.freeze({"r": r, "g": g, "b": b});
const hls = (h, l, s) => Object.freeze({"h": h, "l": l, "s": s});

test("rgb2hls", t => {
    const makeTestCase = (source, expected) => Object.freeze({"source": source, "expected": expected});

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

test("hls2rgb", t => {
    const makeTestCase = (source, expected) => ({"source": source, "expected": expected});

    const testCases = [
        makeTestCase(hls(0, 0, 0), rgb(0, 0, 0)),
        makeTestCase(hls(0, 50, 100), rgb(255, 0, 0)),
        makeTestCase(hls(120, 50, 100), rgb(0, 255, 0)),
        makeTestCase(hls(240, 50, 100), rgb(0, 0, 255)),
        makeTestCase(hls(0, 24, 100), rgb(127, 0, 0)),
        makeTestCase(hls(120, 24, 100), rgb(0, 127, 0)),
        makeTestCase(hls(240, 24, 100), rgb(0, 0, 127)),
        makeTestCase(hls(3, 44, 32), rgb(150, 81, 77)),
    ];

    for(const testCase of testCases) {
        // const actual = colorcvt.hls2rgb(testCase.source);
        const actual = colorcvt.hls2rgbkai(testCase.source);
        t.true(Math.abs(actual.r - testCase.expected.r) < 1);
        t.true(Math.abs(actual.g - testCase.expected.g) < 1);
        t.true(Math.abs(actual.b - testCase.expected.b) < 1);
    }
});
