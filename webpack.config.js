/* global __dirname */
var path = require('path');
var webpack = require('webpack');

module.exports = {
    resolve: {
        modules: [ path.resolve('./lib'), 'node_modules', '.' ],
        extensions: ['.js', '.jsx', '.css', '.scss']
    },
    output: {
        path: path.resolve(__dirname, 'www/dist/'),
        filename: 'bundle.js',
        publicPath: '/dist/'
    },
    module: {
        rules: [
            {
                test: /\.scss|\.css$/,
                loader: 'style-loader'
            },
            {
                test: /\.css$/,
                loader: 'css-loader',
                query: {
                    modules: true,
                    localIdentName: '[name]__[local]___[hash:base64:5]'
                }
            },
            {
                test: /\.jsx$/,
                use:  [
                   { loader: 'babel-loader' }
                ],
            }
        ]
    }
}
