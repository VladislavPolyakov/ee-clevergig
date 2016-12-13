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
            // {
            //     test: /\.css$/,
            //     loader: "style!css"
            // },
            // {
            //     test: /\.scss$/,
            //     loader: "style!css!sass"
            // }
            // {
            //     test: /\.scss$/,
            //     loader: "css!sass"
            // }
            {test: /\.scss$/, loader: ExtractTextPlugin.extract('css!sass')}
        ]
    },
    plugins: [
        new ExtractTextPlugin('main.css'),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            server: { baseDir: ['./public'] }
        })
    ]
    // postcss: [
    //    autoprefixer({
    //      browsers: ['last 2 versions']
    //    })
    //  ],
    //  resolve: {
    //    extensions: ['', '.js', '.sass'],
    //    root: [path.join(__dirname, './src')]
    //  }
};
