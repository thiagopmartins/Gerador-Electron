const webpack = require('webpack');
const autoprefixer = require('autoprefixer')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
	entry: './src/simple-modal-es6.js',
	output: {
		filename: 'dist/simple-modal-es6.min.js',
        libraryTarget: 'umd'
	},
	module: {
		loaders: [{
			test: /\.scss$/,
			loaders: ['style', 'css', 'sass', 'postcss']
		},{
			test: /\.js?$/,
			exclude: /node_modules/,
			loader: 'babel',
			query: {
				presets: ['es2015']
			}
		}]
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin({
			minimize: true
		})
	],
	postcss: [
		autoprefixer({
			browsers: ['last 2 versions']
		})
	]
};
