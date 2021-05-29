const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const isDev = process.env.NODE_ENV === 'development'

module.exports = {
    mode: 'development',
    context: path.resolve(__dirname, 'src'),
    entry: {
       main: './index.ts',
       animation: './scripts/animation/animation.ts'
    },
    plugins: [
        new HTMLWebpackPlugin({
            template: "./index.html"
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
        })
    ],
    module: {
        rules: [
            /*{
                test: /\.ts?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },*/
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {

                        },
                    },
                    'css-loader'
                ]
            },
            {
                test: /\.ts?$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: '[name].[contenthash].js',
        path: path.resolve(__dirname, 'dist')
    }
}