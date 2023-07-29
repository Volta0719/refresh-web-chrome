
const path = require('path')   //调用路径
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const build = 'build'
module.exports = {
    mode: 'production',
    entry: {
        popup: {
            import: './popupIndex.js',
            filename: 'popup/[name].js'
        },
        refreshConfigPage: {
            import: './content/refreshConfigPage.js',
            filename: 'content/[name].js'
        },
        store: {
            import: './bg/store.js',
            filename: 'bg/[name].js'
        }
    },
    output: {
        clean:true,
        path: path.resolve(__dirname, `./${build}`)
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: 'popup/index.html',
            filename: 'popup/index.html',
            chunks: []
            // excludeChunks:['popup/popup.js','popup/popup.css'],
        }),
        new MiniCssExtractPlugin({
            filename: "popup/[name].css"
        }),
        new CopyWebpackPlugin({
            patterns:[
                {
                    from: '_locales',
                    to: '_locales'
                },
                {
                    from: 'icons',
                    to: 'icons'
                },
                {
                    from: 'utils',
                    to: 'utils'
                },
                {
                    from: './manifest.json',
                    to: './'
                }
            ]
        })
    ],
    module: {
        rules: [
            {
                test: /\.css$/,    //css配置
                use: [MiniCssExtractPlugin.loader, 'css-loader']  //注意
            }
        ]
    },
    optimization: {
        minimizer: [
            new TerserPlugin({
                exclude: ['utils/tools.js'],
                terserOptions: {
                    compress: {
                        drop_console: true,
                        drop_debugger: true
                    }
                }
            }),
            new CssMinimizerPlugin(),
        ],
        minimize: true,
    },
}