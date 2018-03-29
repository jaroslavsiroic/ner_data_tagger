//var ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: __dirname,
     entry: {
         app: './src/entries/app.js',
     },
     output: {
         path: './outputs/',
         filename: '[name].bundle.js'
     },
     resolve: {
        root: __dirname+'src/',
        extensions: ['', '.js', '.jsx', '.css', 'scss'],
        modulesDirectories: [
            'node_modules', '.'
        ],
        alias: {
        }
    },
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel'
            },
            {
                test: /\.scss$/,
                loaders: ["style", "css?localIdentName=[name]__[local]___[hash:base64:5]", "sass"]
            }
        ]
    },
    postcss: function () {
        return [require('autoprefixer'), require('precss')];
    },
    stats: { colors: true }
 };
