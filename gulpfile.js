'use strict';

const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const sass = require('gulp-sass');
const imagemin = require('gulp-imagemin');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const svgmin = require('gulp-svgmin');
const autoprefixer = require('autoprefixer');
const bower = require('gulp-bower');
const uglify = require('gulp-uglify');
const replace = require('gulp-token-replace');

// css sass and autoprefixer
gulp.task('css', function() {
  gulp.src('./client/src/css/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.init())
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('./client/dist/css'));
});

// minify htmlmin
gulp.task('htmlmin', function() {
  return gulp.src(['./client/src/*.html', './client/src/**/*.html'])
    .pipe(replace({
      global: {
        token: new Date().getTime()
      }
    }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./client/dist'));
});

// minify images
gulp.task('imagemin', function() {

  return gulp.src(['./client/src/images/*', './client/src/images/*/**', '!./client/src/images/*.svg', '!./client/src/images/*/**.svg'])
    .pipe(imagemin())
    .pipe(gulp.dest('./client/dist/images'))

});

// svgmin
gulp.task('svgmin', function() {

  return gulp.src(['./client/src/images/*.svg', './client/src/images/*/**.svg'])
    .pipe(svgmin())
    .pipe(gulp.dest('./client/dist/images'))

});


// uglify js
gulp.task('uglify', function() {

  return gulp.src(['./client/src/js/*.js', './client/src/js/*/**.js'])
    .pipe(uglify())
    .pipe(gulp.dest('./client/dist/js'))

});

// copy
gulp.task('copy', function() {

  gulp.src(['./client/src/*.png', './client/src/*.ico', './client/src/CNAME'])
    .pipe(gulp.dest('./client/dist'))

  return gulp.src(['./client/src/files/**/*'])
    .pipe(gulp.dest('./client/dist/files'))

});

// bower
gulp.task('bower', function() {
  return bower();
  //.pipe(gulp.dest('dist/bower_components'));
});

// tasks
gulp.task('build', ['bower', 'htmlmin', 'imagemin', 'svgmin', 'css', 'uglify', 'copy']);
gulp.task('default', ['watch', 'build']);
gulp.task('watch', function() {
  gulp.watch(['./client/src/*.html', './client/src/**/*.html'], ['htmlmin']);
  gulp.watch(['./client/src/images/*', './client/src/images/*/**'], ['imagemin']);
  gulp.watch(['./client/src/css/**/*.scss'], ['css']);
  gulp.watch(['./client/src/js/*.js', './client/src/js/*/**.js'], ['uglify']);
  gulp.watch(['./client/src/*.png', './client/src/*.ico', 'src/CNAME'], ['copy']);
});