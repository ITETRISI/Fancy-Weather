const webpack = require('webpack')
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    output: {
        filename: '[name].bundle.js',
        publicPath: '/'
    },
    devServer: {
        contentBase: './dist',
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
    },
    plugins: [
        new MiniCssExtractPlugin()
    ],
}