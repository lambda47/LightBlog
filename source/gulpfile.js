var gulp = require('gulp');
var webpack = require('webpack');
var extractTextPlugin = require('extract-text-webpack-plugin');

gulp.task('default', function(){
	webpack({
		entry: {
			'admin/login': './js/admin/login.js',
			'admin/index': './js/admin/index.js',
			'admin/tag': './js/admin/tag.js'
		},

		output: {
			path: __dirname + '/../app/static',
			filename: '[name].js'
		},

		module: {
			rules: [
				{
					test: /\.js$/,
                    exclude: /node_modules/,
					use: {
					    loader: 'babel-loader',
                        options: {
					        presets: ['es2015']
                        }
                    }

				},
				{
					test: /\.scss$/,
					use: extractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: [{
                                loader: 'css-loader',
                                options: {
                                    minimize: true
                                }
                            },
                            {
                                loader: 'sass-loader'
                            }]
					})
				},
				{
					test: /\.css$/,
					use: extractTextPlugin.extract({
                        fallback: 'style-loader',
                        use: {
                            loader: 'css-loader',
                            options: {
                                minimize: true
                            }
                        }
					})
				},
				{
					test: /\.(ttf|eot|svg|woff|woff2)$/,
					use: 'file-loader'
				},
				{
					test: /\.(jpe?g|gif|png)$/,
					use: {
					    loader: 'url-loader',
                        options: {
					        limit: 10240
                        }
                    }
				},
				{
					test: /\.vue$/,
					use: {
					    loader: 'vue-loader',
                        options: {
					        loaders: {
					            js: {
					                loader: 'babel-loader',
                                    options: {
					                    presets: ['es2015']
                                    }
                                }
                            }
                        }
                    }
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
			// new webpack.optimize.UglifyJsPlugin()
		],

		resolve: {
		    modules: [
		        'js', 'scss', 'component', 'node_modules'
            ],
			alias: {
				'vue$': 'vue/dist/vue.min.js'
			}
		},

		watch: true,

	}, function(err, stats){
		console.log(err);
		console.log(stats.toString());
	});
});