const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const common = require('./webpack.config');

let baseUrl ;
switch (process.env.NODE_ENV) {
  case 'test':
    baseUrl = '"http://manager.edu.lecloud.com"'
    break;  
  case 'repro':
    baseUrl = 'api.ready.com'
  break;
  case 'prod':
    baseUrl = '"http://manager.edu.lecloud.com"'
  break;
}


module.exports = merge(common, {
	// devtool: 'source-map',
	output: {
		path: path.resolve(__dirname, 'jhx'),
		filename: 'js/[name].js'
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: '"production"'
			}
		}),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.DefinePlugin({
			'API_HOST':baseUrl
		})
	]
});
// console.log(1234,process.env.NODE_ENV);
// const NODE_ENV = process.env.NODE_ENV
// let baseUrl ;
// switch (NODE_ENV) {
//   case 'test':
//     baseUrl = 'api.test.com'
//     break;  
//   case 'ready':
//     baseUrl = 'api.ready.com'
//   break;
//   case 'production':
//     baseUrl = 'api.prod.com'
//   break;
// }
// if (process.env.NODE_ENV === 'production') {
//     module.exports.devtool = '#source-map';
//     module.exports.plugins = (module.exports.plugins || []).concat([
//       new webpack.DefinePlugin({
//         'process.env': {
//           NODE_ENV: '"production"'
//         }
//       }),
// 	  new webpack.DefinePlugin({
// 	  	'API_HOST':'"www.baidu.com"'
// 	  }),
//       new webpack.optimize.UglifyJsPlugin(),
//     ]);
// }