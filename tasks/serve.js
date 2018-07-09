'use strict'

const browserSync = require('browser-sync').create()

module.exports = function () {
  return function () {
    browserSync.init({
      server: {
        baseDir: 'public',
        index: 'index.html'
      }
    })
    browserSync.watch('public/**/*.*').on('change', browserSync.reload)
  }
}
