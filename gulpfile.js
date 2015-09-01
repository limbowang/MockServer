var
  gulp = require('gulp'),
  server = require('gulp-express'),
  browserify = require('gulp-browserify'),
  less = require('gulp-less'),
  minifyCSS = require('gulp-minify-css');

gulp.task('js', function() {
  // Single entry point to browserify 
  return
  gulp.src('entries/**/*.js')
    .pipe(browserify({
      insertGlobals: true
    }))
    .pipe(gulp.dest('./public/javascripts'))
});

gulp.task('css', function() {
  return gulp.src('./less/*.less')
    .pipe(less())
    .pipe(minifyCSS())
    .pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('server', function() {
  server.run(['./bin/www']);

  gulp.watch(['less/**/*.less'], ['css'], server.notify);
  gulp.watch(['entries/**/*.js'], ['js'], server.notify);
  gulp.watch(['public/images/**/*'], server.notify);
  gulp.watch(['app.js', 'routes/**/*.js'], [server.run]);
});

gulp.task('build', ['js', 'css']);

gulp.task('default', ['build']);
