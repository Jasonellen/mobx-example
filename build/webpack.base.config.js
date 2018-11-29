var path = require('path')
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var _DEV = process.env.NODE_ENV === 'development'
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports = {
	// context: __dirname, // string (absolute path!) default root->'/'
	// the home directory for webpack(webpack 运行文件根目录)
  entry: {
    app: './src/app.js'
		//入口entry和loader的路径都是相对于context的
  },
  output: {
    path: config.build.path,
    filename: '[name].js',
		publicPath: '/'
  },
  resolve: {  //解决一些扩展名和别名
    extensions: [ '.web.js', '.js', '.json'],//.web.js要放在第一位
    alias: {
      '@': resolve('src'),
			'api': resolve('src/api'),
			'actions': resolve('src/actions'),
			'reducers': resolve('src/reducers'),
			'service': resolve('src/service'),
			'static': resolve('static')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        include: resolve('src'),
      },
      {
        test: /\.js|jsx$/,
        loader: 'babel-loader',
        include: resolve('src'),
      },
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader",
							options: {sourceMap: true}
						},
						"postcss-loader"
					]
				})
			},
			{
				test: /\.scss$/,
				use: ExtractTextPlugin.extract({
					fallback: "style-loader",
					use: [
						{
							loader: "css-loader",
							options: {sourceMap: true}
						},
						"postcss-loader",
						"sass-loader"

					]
				})
			},
      {
        test: /\.(?:jpg|gif|png|pic|svg)$/,
				use: [
					{
						loader: "url-loader",
						options: {
		          limit: 10000,
		          name: config.build.imgPath+'/[name].[ext]' //outpath(../dist)基础上
		        },
					}
				],
      },
      {
        test: /\.woff$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: config.build.fontPath+'/[name].[hash:7].[ext]'
        }
      }
    ]
  },
	plugins: [
		new ExtractTextPlugin({
			filename: config.build.cssPath+'/[name].[contenthash:7].css',
			disable: _DEV
		})
	]
}
