'use strict'

const gulp = require('gulp')
const notify = require('gulp-notify')
const gulplog = require('gulplog')
const AssetsPlugin = require('assets-webpack-plugin')
const plumber = require('gulp-plumber')
const webpackStream = require('webpack-stream')
const webpack = require('webpack')
const named = require('vinyl-named')
const gulpIf = require('gulp-if')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

module.exports = function (args) {
  return function (callback) {
    let firstBuildReady = false

    function done (err, stats) {
      firstBuildReady = true
      if (err) { // hard error, see https://webpack.github.io/docs/node.js-api.html#error-handling
        return // emit('error', err) in webpack-stream
      }
      gulplog[stats.hasErrors() ? 'error' : 'info'](stats.toString({
        colors: true
      }))
    }

    let options = {
      mode: isDevelopment ? 'development' : 'production',
      entry: {
        index: '../frontend/src/index.tsx'
      },
      output: {
        publicPath: '/src/',
        filename: isDevelopment ? '[name].js' : '[name]-[chunkhash:10].js'
      },
      watch: isDevelopment,
      devtool: isDevelopment ? 'cheap-module-inline-sourcemap' : false,
      resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
      },
      module: {
        rules: [{
          test: /\.js$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        }, {
          test: /\.jsx$/,
          use: ['babel-loader'],
          exclude: /node_modules/
        }, {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          exclude: /node_modules/
        }, {
          test: /\.css$/,
          use: [ 'style-loader', 'css-loader' ]
        }
        ]
      },
      plugins: [
        new webpack.NoEmitOnErrorsPlugin()
      ],
      performance: {
        hints: false
      },
      optimization: {
        minimizer: [
          new UglifyJsPlugin()
        ]
      }
    }

    if (!isDevelopment) {
      options.plugins.push(new AssetsPlugin({
        filename: 'webpack.json',
        path: args.dirname + 'manifest',
        processOutput (assets) {
          for (let key in assets) {
            assets[key + '.js'] = assets[key].js.slice(options.output.publicPath.length)
            delete assets[key]
          }
          console.log(assets)
          return JSON.stringify(assets)
        }
      }))
    };

    return gulp.src('../frontend/js/*.js')
      .pipe(plumber({
        errorHandler: notify.onError(err => ({
          title: 'Webpack',
          message: err.message
        }))
      }))
      .pipe(named())
      .pipe(webpackStream(options, webpack, done))
      .pipe(gulp.dest('../public/src'))
      .on('data', function () {
        if (firstBuildReady) {
          callback()
        }
      })
  }
}
