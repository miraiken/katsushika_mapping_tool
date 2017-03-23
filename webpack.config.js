const path = require("path");
const webpack = require("webpack");

module.exports = {
    entry: {
        "application": "./script.js",
    },
    output: {
        path:     path.resolve(__dirname, "build"),
        filename: "script.min.js",
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
    ],
    module: {
        rules: [
            {
                test:    /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use:     {
                    loader:  "babel-loader",
                    options: {
                        presets: [["env", {
                            "modules": false,
                            "targets": {
                                "browsers": ["last 2 versions", "safari >= 7", "ie >= 11"],
                            },
                        }]],
                    },
                },
            },
        ],
    },
};
