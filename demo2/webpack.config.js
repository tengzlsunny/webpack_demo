const VueLoaderPlugin = require('vue-loader/lib/plugin'); // vue-loader @15版本及以上必写
const CopyWebpackPlugin = require('copy-webpack-plugin') // 用于拷贝文件

const path = require('path')
const srcDir = path.resolve(__dirname, './src')
module.exports = {
    // 入口
    entry: './src/main.js',

    // 出口
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist')
    },

    // 模块
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
        ]
    },

    // 插件
    plugins: [
        new VueLoaderPlugin(),
        new CopyWebpackPlugin([
            {
                from : './index.html',
                to: './'
            }
        ]),
    ],

    resolve: {
        alias: {
            '@': srcDir
        },
        extensions: ['.ts', '.js', '.json']
    },

    devServer: {
        port: 8080, // 端口
        host: 'localhost'
    }
}