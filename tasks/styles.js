'use strict';

const gulp = require('gulp');
const combine = require('stream-combiner2').obj;
const plumber = require('gulp-plumber');
const gulpIf = require('gulp-if');
const stylus = require('gulp-stylus');
const notify = require('gulp-notify');
const sourcemaps = require('gulp-sourcemaps');
const resolver = require('stylus').resolver;
const rev = require('gulp-rev');
const revReplace = require('gulp-rev-replace')
const autoprefixer = require('gulp-autoprefixer')

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

module.exports = function() {
  return function() {
    return combine(
      gulp.src('frontend/styles/index.styl')
        .pipe(plumber({
          errorHandler: notify.onError(err => ({
            title:   'Styles',
            message: err.message
          }))
        }))
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(stylus({
          define: {
            url: resolver()
          },
          compress: !isDevelopment,
        }))
        .pipe(autoprefixer())
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulpIf(!isDevelopment, combine(rev(), revReplace({
          manifest: gulp.src('manifest/assets.json', {allowEmpty: true})
        }))))
        .pipe(gulp.dest('public/styles'))
        .pipe(gulpIf(!isDevelopment, combine(rev.manifest('css.json'), gulp.dest('manifest'))))
    ).on('error', notify.onError())};
  };
