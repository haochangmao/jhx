var path = require('path');
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var VueLoaderPlugin = require('vue-loader/lib/plugin');


var devBuildPath = path.resolve(__dirname, 'dist');

module.exports = {
    entry:  ['babel-polyfill', './src/js/main.js'], // 项目的入口文件，webpack会从main.js开始，把所有依赖的js都加载打包
    
    resolve:{
        alias:{
            'vue$':'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
		new HtmlwebpackPlugin({
			template: "./src/index.html",
			filename: "./index.html",
			favicon:'src/img/favicon.ico'
		}),
		new VueLoaderPlugin(),
		new webpack.ProvidePlugin({
			$: 'jquery',
			jQuery: 'jquery'
		})
	],
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader'
                ],
            },
            {
                test: /\.scss$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader'
                ],
            },
            {
                test: /\.sass$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'sass-loader?indentedSyntax'
                ],
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'file-loader',
                options: {
                    name: 'img/[name].[ext]?[hash]'
                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader'
                        ],
                        'sass': [
                            'vue-style-loader',
                            'css-loader',
                            'sass-loader?indentedSyntax'
                        ]
                    }
                }
            }
        ]
    }

};

