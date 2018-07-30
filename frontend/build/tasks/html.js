const gulp = require('gulp')
const combine = require('stream-combiner2').obj
const notify = require('gulp-notify')
const revReplace = require('gulp-rev-replace')
const gulpIf = require('gulp-if')
const rev = require('gulp-rev')

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'

module.exports = function () {
  return function () {
    return combine(
      gulp.src('../../frontend/index.html')
      .pipe(gulpIf(!isDevelopment, combine(rev(), revReplace({
        manifest: gulp.src('../../rev-manifest.json', {allowEmpty: true})
      }))))
      .pipe(gulp.dest('../../public'))
      .pipe(gulpIf(!isDevelopment, combine(rev.manifest('../../rev-manifest.json', {
        base: '../../',
        merge: true,
      }), gulp.dest('../../'))))
    ).on('error', notify.onError())
  }
}
