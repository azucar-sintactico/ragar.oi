const path = require("path");
const config = require('./config.js');

const DIST_DIR = config.DIST_DIR;
const CLIENT_DIR = config.CLIENT_DIR;

module.exports = {  
    context: CLIENT_DIR,

    entry: "./main",

    output: {
        path:     DIST_DIR,
        filename: "bundle.js"
    },

    resolve: {
        extensions: ['.js']
    }
};