var path = require('path')
var utils = require('./utils')
var config = require('./index')
var vueLoaderConfig = require('./vue-loader.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var srcPath = path.resolve(__dirname, './src/')
var webpack = require('webpack')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

var plugins = [
  new ExtractTextPlugin({
    filename: '[name].css',
    disable: false,
    allChunks: true,
  }),
  new webpack.LoaderOptionsPlugin({
      options: {
          lessLoader: {
              lessPlugins: [
                  {
                      install (less) {
                          less.functions.functionRegistry.add('px2rem', (px, size) => {
                              const newSize = (size && size.value || 750) / 10;
                              return new (less.tree.Anonymous)(`${px.value / newSize}rem`);
                          });
                      },
                  },
              ],
          },
      },
  }),
]

module.exports = {
  entry: {
    app: './src/main.js',
    vendor: ['babel-polyfill', 'vue', path.resolve(__dirname, '../src/plugins/vue.ext.js')],
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
          test: /\.less$/,
          include: srcPath,
          use: ExtractTextPlugin.extract({
              fallback: 'style-loader',
              use: [{
                  loader: 'css-loader',
              }, {
                  loader: 'less-loader',
              }],
          }),
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },
  plugins: plugins,
}
