module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    devServer: {
        port: 3030, // you can change the port
        hot: true,
        open: true,
        historyApiFallback: true,
        proxy: {
            "/proxy": {
                target: "https://pfa.foreca.com/",

                changeOrigin: true
            }
        }
    },
}