var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var path = require('path');
var autoprefixer = require('autoprefixer')


module.exports = {
    entry: "./assets/js/entry.js",
    output: {
        path: "public/js",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass')}
        ]
    },
    plugins: [
        new ExtractTextPlugin('./css/main.css'),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['./public'] }
        })
    ],
    postcss: [
       autoprefixer({
         browsers: ['last 2 versions']
       })
     ]
};
