var gulp = require('gulp');
var webpack = require('webpack');
var extractTextPlugin = require('extract-text-webpack-plugin');

gulp.task('default', function(){
	webpack({
		entry: {
			'admin/login': './js/admin/login.js',
			'admin/index': './js/admin/index.js'
		},

		output: {
			path: __dirname + '/../app/static',
			filename: '[name].js'
		},

		module: {
			rules: [
				{
					test: /\.scss$/,
					use: extractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?minimize=true!sass-loader'})
				},
				{
					test: /\.css$/,
					use: extractTextPlugin.extract({fallback: 'style-loader', use: 'css-loader?minimize=true'})
				},
				{
					test: /\.(ttf|eot|svg|woff|woff2)$/,
					use: 'file-loader'
				},
				{
					test: /\.(jpe?g|gif|png)$/,
					use: 'url-loader?limit=10240'
				},
				{
					test: /\.vue$/,
					use: 'vue-loader'
				}
			]
		},

		plugins: [
			new webpack.optimize.CommonsChunkPlugin({name: 'admin/common', minChunks: 2}),
			new extractTextPlugin('[name].css'),
			new webpack.ProvidePlugin({
				$: 'jquery',
				jQuery: 'jquery',
				'window.jQuery': 'jquery'
			}),
			new webpack.optimize.UglifyJsPlugin()
		],

		resolve: {
		    modules: [
		        'js', 'scss', 'component', 'node_modules'
            ],
			alias: {
				'vue$': 'vue/dist/vue.min.js'
			}
		},

		watch: true
	}, function(err, stats){
		console.log(err);
		console.log(stats.toString());
	});
});