var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var autoprefixer = require('autoprefixer');

module.exports = {
    entry: "./assets/js/entry.js",
    output: {
        path: "public/js",
        filename: "bundle.js"
    },
    module: {
        loaders: [
            {test: /\.scss$/, loader: ExtractTextPlugin.extract('css?sourceMap!sass?sourceMap')},
            // { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=10000!img?progressive=true' }
        ]
    },
    devtool: "inline-source-map",
    plugins: [
        new ExtractTextPlugin('./css/main.css', {allChunks: true}),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['./public'], directory: true }
        })
    ],
    postcss: [
       autoprefixer({
         browsers: ['last 2 versions']
       })
     ]
};
