const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: 'production',
    output: {
        filename: '[name].[hash].js',
        publicPath: '/'
    },
    // optimization: {
    //     minimizer: [
    //         // For webpack@5 you can use the `...` syntax to extend existing minimizers (i.e. `terser-webpack-plugin`), uncomment the next line
    //         // `...`,
    //         new CssMinimizerPlugin(),
    //     ],
    // },
    // plugins: [new MiniCssExtractPlugin()],
}