'use strict';

const gulp = require('gulp');
const path = require('path');

function lazyRequireTask(taskName, path, options) {
  options = options || {};
  gulp.task(taskName, function(callback) {
    let task = require(path).call(this, options);
    return task(callback);
  });
}

lazyRequireTask('styles', './tasks/styles');

lazyRequireTask('assets', './tasks/assets');

lazyRequireTask('webpack', './tasks/webpack', {
  dirname: path.join(__dirname, '../'),
});

lazyRequireTask('clean', './tasks/clean');

lazyRequireTask('build', './tasks/build');

lazyRequireTask('serve', './tasks/serve');

lazyRequireTask('dev', './tasks/dev');

lazyRequireTask('views', './tasks/views');

lazyRequireTask('html', './tasks/html');
