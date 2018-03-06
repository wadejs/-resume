const path = require('path');
const webpack = require('webpack');
// const UglifyWebpackPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin'); //打包前清理产出目录
const babelpolyfill = require("babel-polyfill");
module.exports = {
    devtool: 'inline-source-map',
    entry: {
        entry: './src/entry.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        publicPath: '/' // 打包生成的html中引用的地址会包括主机（绝对路径）
    },
    resolve: {
        extensions: ['.js', '.vue', '.json','.styl','.css','.scss','.less'],
        alias: {
          'vue$': 'vue/dist/vue.esm.js',
          'common': path.resolve(__dirname, '../src/common/'),
          'js': path.resolve(__dirname, './src/js/'),
          'css': path.resolve(__dirname, './src/css/')
        }
    },
    module: {
        rules: [{
                test: /\.(jsx|js)$/,
                use: {
                    loader: 'babel-loader'
                },
                exclude: /node_modules/
            },
            {
                test: /\.txt$/,
                use: 'raw-loader'
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        // new UglifyWebpackPlugin()
        new webpack.optimize.CommonsChunkPlugin({ // 公共模块拆出来；主要做拆分和在页面上插入script的工作
            name: [ /*'vendor'  , 'vue' */ /* 'jquery' */],
            /*这个数组里的值需要与entry入口文件的key对应，
              这个数组里的值都会被写入template页面的script上，
              如果数组里的值在entry里找不到对应的入口，则依然会生成一个文件加入到页面上，
              但是里头没有实际的代码， 只有一些webpack生成的代码*/
            filename: 'assets/js/[name].js',
            minChunks: 2
        }),
        new HtmlWebpackPlugin({
            minify: {
                removeAttributeQuotes: true,
                removeComments: true,
                collapseWhitespace: true,
                removeScriptTypeAttributes: true,
                removeStyleLinkTypeAttributes: true
            },
            hash: true,
            template: './src/index.html'
        }),
        new webpack.BannerPlugin('by wadejs'), // 在js文件开头加上相关信息
        new CopyWebpackPlugin([{ // 复制资源到产出目录
            from: __dirname + '/src/public',
            to: './public'
        }])
    ],
    devServer: {
        clientLogLevel: 'warning',
        contentBase: path.resolve(__dirname, 'dist'),
        compress: true,
        port: 3322,
        inline: true,
        open: false // 是否自动打开浏览器
    }
};