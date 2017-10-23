var gulp = require('gulp');
var browserSync = require('browser-sync');
var minify = require('gulp-uglify');
var clean = require('gulp-clean');
var del = require('del');
var reload = browserSync.reload;

// 监视文件改动并重新载入
gulp.task('serve', function() {
  browserSync({
    server: {
      baseDir: 'home'
    }
  });

  gulp.watch(['*.html', 'css/*.css', './*.js'], {cwd: 'home'}, reload);
});
// 清楚原文件夹
gulp.task('clean', function(next) {
  return del(['build'])
})
// copy 文件
gulp.task('copy', ['clean'], function(next) {
  return gulp.src('home/**')
    .pipe(gulp.dest('build'))
})
// 压缩 js文件
gulp.task('default', ['copy'], function() {
  return gulp.src('build/home.js')
    .pipe(minify())
    .pipe(gulp.dest('build'))
});