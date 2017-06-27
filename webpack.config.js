var path=require("path");
var webpack=require("webpack");
var ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: 'dist/',
        filename: 'build.js'
    },
    module: {
         loaders: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {

                    loaders: {
                        css: ExtractTextPlugin.extract({
                            use: 'css-loader',
                            fallback: 'vue-style-loader'
                        }),//处理，.vue中的style
                        less:ExtractTextPlugin.extract({
                            use: 'css-loader!less-loader',
                            fallback: 'vue-style-loader'
                        })//处理，.vue中的style lang="less"
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
             {
                 test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                 loader: 'file-loader'
             },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]?[hash]'
                }
            },
             {
                 test:/\.css$/,
                 use: ExtractTextPlugin.extract({
                     fallback: "style-loader",
                     use: "css-loader"
                 })
             },////处理import 的css文件
             {
                 test: /\.less$/,
                 use: ExtractTextPlugin.extract(['css-loader','less-loader'])
             },//处理import 的less文件
             {
                 test: /muse-ui.src.*?js$/,
                 loader: 'babel-loader'
             }
        ]
    },
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'vue$': 'vue/dist/vue.common.js',
            'muse-components': 'muse-ui/src'
        }
    },
    externals: { DingTalkPC: "window.DingTalkPC" },
    plugins:[
        new ExtractTextPlugin('css/[name].css'),
        
    ]
    //devtool: '#eval-source-map'
}
