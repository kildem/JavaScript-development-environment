import path from 'path';
import webpack from 'webpack';

export default {
	resolve: {
		extensions: ['*', '.js', '.jsx', '.json']
	},
	devtool: 'inline-source-map',
	entry: [
		path.resolve(__dirname, 'src/index')
	],
	target: 'web',
	output: {
		path: path.resolve(__dirname, 'src'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			debug: true
		})
	],
	module: {
		rules: [
			{test: /\.js$/, exclude: /node_modules/, loaders: ['babel-loader']},
			{test: /\.css$/, loaders: ['style-loader','css-loader']}
		]
	}
}