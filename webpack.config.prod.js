const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const cssFilename = 'css/[name].[contenthash:8].css';
const extractTextPluginOptions = { publicPath: '../' };

const lastIndex = process.argv.length - 1;
const root = process.argv[lastIndex];

module.exports = {
    // Don't attempt to continue if there are any errors.
  bail: true,
  devtool: 'source-map',
  entry: `${root}/index.js`,
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: ''
  },
  externals: [
      {
        window: 'window'
      }
  ],
  resolve: {
    alias: {
      'handlebars': 'handlebars/dist/handlebars.js'
    },
    modules: [
      path.resolve('./src'),
      path.resolve('./node_modules')
    ]
  },
  module: {
    loaders: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          inlineRequires: '/img/'
        }
      },
      {
        test: /\.js$/,
        include: resolveApp('./src'),
        loader: require.resolve('babel-loader'),
        options: {
          compact: true,
          presets: ['es2015', 'es2016', 'es2017']
        },
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: ['img:src'],
            minimize: false
          }
        }
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.jpg$/, /\.png$/, /\.svg$/],
        loader: 'file-loader',
        options: {
          name: 'img/[name].[ext]'
        }  
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[hash:8].[ext]'
          }
        }]
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract(
          Object.assign(
            {
              fallback: require.resolve('style-loader'),
              use: [
                {
                  loader: require.resolve('css-loader'),
                  options: {
                    importLoaders: 1,
                    minimize: true,
                    sourceMap: true,
                  },
                },
                {
                 loader: 'sass-loader'
                },
                {
                  loader: require.resolve('postcss-loader'),
                  options: {
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9',
                        ],
                        flexbox: 'no-2009',
                      }),
                    ],
                  },
                },
              ],
            },
            extractTextPluginOptions
          )
        ),
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      inject: true,
      template: `${root}/index.html`,
      minify: false,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      },
      compress: {
        screw_ie8: true
      },
      comments: false,
      sourceMap: true
    }),
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
    new ImageminPlugin({
      pngquant: {
        quality: '95-100'
      },
      jpegtran: {
        progressive: true
      },
      svgo: null  // Flowrida doesn't like this
    }),
    new webpack.BannerPlugin({
       banner: `Root folder: ${root}`
    })
  ],
};