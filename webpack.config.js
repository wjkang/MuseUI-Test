var path=require("path");
var webpack=require("webpack");

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
                    // vue-loader options go here
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
                 loader:"style-loader!css-loader"
             },
             {
                 test: /\.less$/,
                 use: [
                     'style-loader',
                     { loader: 'css-loader', options: { importLoaders: 1 } },
                     'less-loader'
                 ]
             },
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
    }
    //devtool: '#eval-source-map'
}
