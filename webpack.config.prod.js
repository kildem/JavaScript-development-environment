import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

export default {
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json']
	},
	devtool: 'source-map',
	entry:{
		vendor: path.resolve(__dirname, 'src/vendor'),
		main: path.resolve(__dirname, 'src/index')
	},
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/',
		filename: '[name].[chunkhash].js'
	},
	plugins: [
		// Generate an external css file with a hash in the filename
		new ExtractTextPlugin('[name].[contenthash].css'),
		// Hash the files using MD5 so that their names change when the content changes.
		new WebpackMd5Hash(),
		// Use CommonsChunkPlugin to create a separate bundle
		// of vendor libraries so that they're cached separately.
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor'
		}),
		
		new HtmlWebpackPlugin({
			template: 'src/index.html',
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeRedundantAttributes: true,
				useShortDoctype: true,
				removeEmptyAttributes: true,
				removeStyleLinkTypeAttributes: true,
				keepClosingSlash: true,
				minifyJS: true,
				minifyCSS: true,
				minifyURLs: true
			},
			inject: true,
			// Note that you can add custom options here if you need to handle other custom logic in index.html
			// To track JavaScript errors via TrackJS, sign up for a free trial at TrackJS.com and enter your token below.
			trackJSToken: '89d6af600dba433793b306596177df25'
		}),
		// Minify JS
		new webpack.optimize.UglifyJsPlugin({ sourceMap: true }),
		new webpack.LoaderOptionsPlugin({
			minimize: true,
			debug: false,
			noInfo: true, // set to false to see a list of every file being bundled.
		})
	],
	module: {
		rules: [
			{test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
			{test: /\.css$/, loader: ExtractTextPlugin.extract('css-loader?sourceMap')}
		]
	}
}