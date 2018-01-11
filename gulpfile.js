const gulp = require('gulp');
const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const gutil = require('gulp-util');
const wait = require('gulp-wait');
const concat = require('gulp-concat');

const paths = {
  cssSrc: './src/scss/dota.scss',
  cssParts: './src/scss/**',
  cssDest: './public/stylesheets/',
  cssMapsDest: './maps/',
  jsSrc: './src/js/*.js',
  jsParts: ['./src/js/**/*', '!./src/js/roster/**/*', '!./src/js/roster/*.js'],
  jsDest: './public/javascript/',
  rosterParts: ['./src/js/roster/*/*.js', './src/js/roster/*.js'],
  rosterDest: './public/javascript/',
  jsVendor: './src/js/vendor/*.js',
};

gulp.task('css', () => {
  gulp.src(paths.cssSrc)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(wait(50))
    .pipe(sass())
    .pipe(sourcemaps.write(paths.cssMapsDest))
    .pipe(plumber.stop())
    .pipe(gulp.dest(paths.cssDest))
    .pipe(connect.reload());
});

gulp.task('rosterScripts', () => {
  gulp
    .src(paths.rosterParts)
    .pipe(concat('roster.js'))
    .pipe(gulp.dest(paths.rosterDest))
    .pipe(connect.reload());
});

gulp.task('scripts', () => {
  gulp
    .src([paths.jsVendor, ...paths.jsParts, paths.jsSrc])
    .pipe(concat('all.js'))
    .pipe(gulp.dest(paths.jsDest))
    .pipe(connect.reload());
});

gulp.task('watch:css', ['css'], () => gulp.watch(paths.cssParts, ['css']));
gulp.task('watch:scripts', ['scripts'], () => gulp.watch([paths.jsParts, paths.jsSrc], ['scripts']));
gulp.task('watch:rosterScripts', ['rosterScripts'], () => gulp.watch([paths.rosterParts], ['rosterScripts']));

gulp.task('default', ['css', 'scripts', 'rosterScripts', 'watch:rosterScripts', 'watch:scripts', 'watch:css']);
