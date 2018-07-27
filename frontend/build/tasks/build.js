'use strict'

const gulp = require('gulp')

module.exports = function () {
  return gulp.series('clean', 'assets', gulp.parallel('webpack', 'styles'), 'html');
}
