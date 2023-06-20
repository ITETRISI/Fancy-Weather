const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")

const babelLoader = {
  test: /\.jsx?$/,
  loader: 'babel-loader'
};

const tsLoader = {
  test: /\.tsx?$/,
  loader: 'ts-loader'
};

const svgLoader = {
  test: /\.svg$/,
  oneOf: [
    {
      loader: 'svg-react-loader'
    }
  ]
};

const cssLoader = {
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, "css-loader"],
};

module.exports = {
    output: {
        path: path.join(__dirname, "/dist"), // the bundle output path
        filename: "bundle.js", // the name of the bundle
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "src/index.html", // to import index.html file inside index.js
        }),
        new MiniCssExtractPlugin(),
    ],
    devServer: {
        port: 3030, // you can change the port
    },
    module: {
        rules: [
          babelLoader,
          tsLoader,
          svgLoader,
          cssLoader,
        ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
    },
};
