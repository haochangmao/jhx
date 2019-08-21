const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.config');

const devBuildPath = path.resolve(__dirname, 'dist');

module.exports = merge(common, {
	devtool: 'inline-source-map',
	output: {
		path: devBuildPath,
		filename: 'js/[name].js'
	},
	devServer: {
	    contentBase: devBuildPath,
	    historyApiFallback: true,
	    overlay: true,
	    hot:true,//启用Webpack的热模块替换功能
	    stats: "errors-only" ,//只显示包中的错误
	    open:true, //启用“打开”后，dev服务器将打开浏览器
	    proxy: {
	        "/manager": {
	            target: "http://manager.edu.lecloud.com",
	            changeOrigin: true,//参数是如果接口跨域需要配置这个参数；
				secure: false,
	            pathRewrite: {"^/manager" : ""}
	            //还有一个参数secure，如果是https接口需要配置这个参数；
	        },
			"/api": {
			    target: "http://region.vps.lecloud.com",
			    changeOrigin: true,//参数是如果接口跨域需要配置这个参数；
				secure: false,
			    pathRewrite: {"^/api" : ""}
			    //还有一个参数secure，如果是https接口需要配置这个参数；
			},
	    }//重定向
	},
	 plugins: [
		new webpack.DefinePlugin({
			'API_HOST':'"/manager"'
		})
	],
});