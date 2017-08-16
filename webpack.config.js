const path = require('path');
const fs = require('fs');

const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

const cssFilename = 'css/[name].[contenthash:8].css';
const extractTextPluginOptions = { publicPath: process.env.NODE_ENV === 'production' ? '' : '/' };

const root = process.argv[2];
module.exports = {
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
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      inject: true,
      template: `${root}/index.hbs`,
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      _: 'lodash',
    }),
    new ExtractTextPlugin({
      filename: cssFilename,
    }),
  ],
  resolve: {
    alias: {
      'handlebars': 'handlebars/dist/handlebars.js'
    }
  },
  module: {
    // resolveLoader: {
    //   fallback: path.join(__dirname, 'node_modules'),
    //   alias: {
    //     'hbs': 'handlebars-loader'
    //   }
    // },
    loaders: [
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
        query: {
          inlineRequires: '/img/'
        }
      },
      {
        test: /\.(js|jsx)$/,
        include: resolveApp(root),
        loader: require.resolve('babel-loader'),
        options: {
          
          // This is a feature of `babel-loader` for webpack (not Babel itself).
          // It enables caching results in ./node_modules/.cache/babel-loader/
          // directory for faster rebuilds.
          cacheDirectory: true,
        },
      },
      {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.jpg$/, /\.png$/, /\.svg$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'img/[name].[hash:8].[ext]',
        },
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
        test: /\.css$/,
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
                  loader: require.resolve('postcss-loader'),
                  options: {
                    // Necessary for external CSS imports to work
                    // https://github.com/facebookincubator/create-react-app/issues/2677
                    ident: 'postcss',
                    plugins: () => [
                      require('postcss-flexbugs-fixes'),
                      autoprefixer({
                        browsers: [
                          '>1%',
                          'last 4 versions',
                          'Firefox ESR',
                          'not ie < 9', // React doesn't support IE8 anyway
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
};