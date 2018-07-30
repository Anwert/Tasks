'use strict'

const gulp = require('gulp')

module.exports = function () {
  return gulp.series('clean', 'webpack', 'assets', 'styles', 'html');
}
