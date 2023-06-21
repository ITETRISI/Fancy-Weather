const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const postcssPresetEnv = require('postcss-preset-env');

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
    oneOf: [{
        loader: 'svg-react-loader'
    }]
};

const cssLoader = {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, "css-loader"],
};

const scssModulesLoader = {
    test: /\.module\.scss$/,
    use: [{
            loader: MiniCssExtractPlugin.loader
        },
        {
            loader: "css-loader",
            options: {
                sourceMap: true,
                importLoaders: 2,
                modules: {
                    mode: "local",
                    localIdentName: "[name]__[local]__[contenthash:base64:5]"
                }
            }
        },
        {
            loader: "postcss-loader",
            options: {
                sourceMap: true,
                postcssOptions: {
                    config: path.join(__dirname, "./postcss.config.js"),
                    plugins: () => [postcssPresetEnv()]
                }
            }
        },
        {
            loader: "sass-loader",
            options: {
                sourceMap: true
            }
        }
    ]
};

const scssLoader = {
    test: /\.scss$/,
    exclude: /\.module.scss$/,
    use: [{
            loader: MiniCssExtractPlugin.loader
        },
        {
            loader: "css-loader",
            options: {
                sourceMap: true
            }
        },
        {
            loader: "postcss-loader",
            options: {
                sourceMap: true,
                postcssOptions: {
                    config: path.join(__dirname, "./postcss.config.js"),
                    plugins: () => [postcssPresetEnv()]
                }
            }
        },
        {
            loader: "sass-loader",
            options: {
                sourceMap: true
            }
        }
    ]
};

const fontLoader = {
    test: /\.(woff|ttf|eot|svg)(\?v=[a-z0-9]\.[a-z0-9]\.[a-z0-9])?$/,
    include: /node_modules/,
    type: 'asset/resource'
};

const imgLoader = {
    test: /\.(png|jpg|jpeg|gif|ico)$/,
    include: /assets/,
    type: 'asset/resource'
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
        hot: true,
        historyApiFallback: true,
        proxy: {
            "/proxy": {
                target: "https://pfa.foreca.com/",

                changeOrigin: true
            }
        }
    },
    module: {
        rules: [
            fontLoader,
            imgLoader,
            babelLoader,
            tsLoader,
            svgLoader,
            cssLoader,
            scssModulesLoader,
            scssLoader
        ],
    },
    resolve: {
        modules: ['src', 'node_modules'],
        extensions: ['*', '.js', '.jsx', '.ts', '.tsx', '.css', '.scss'],
        fallback: {
            crypto: false,
            assert: false,
            stream: false,
            buffer: false,
            https: false,
            http: false,
            zlib: false,
            util: false,
            url: false,
            querystring: false,
            path: false,
            dns: false,
            net: false,
            tls: false,
            fs: false
          }
    },
};