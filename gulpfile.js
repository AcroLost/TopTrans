const gulp = require('gulp'),
  scss = require('gulp-scss'),
  minify = require('gulp-clean-css'),
  browserSync = require('browser-sync'),
  autoprefixer = require('gulp-autoprefixer'),
  imagemin = require('gulp-imagemin'),
  terser = require('gulp-terser'),
  htmlmin = require('gulp-htmlmin');

gulp.task('serve', ['scss'], function () {

  browserSync.init({
    server: "./src"
  });

  gulp.watch("src/scss/*.scss", ['scss']);
  gulp.watch("src/*.html").on('change', browserSync.reload);
  gulp.watch("src/js/*.js").on('change', browserSync.reload);
});

gulp.task('minify', function () {
  gulp.src('src/css/*.css')
    .pipe(minify())
    .pipe(gulp.dest('dist/css'));
  gulp.src('src/image/*')
    .pipe(imagemin())
    .pipe(gulp.dest('dist/image'))
  gulp.src('src/js/*.js')
    .pipe(terser())
    .pipe(gulp.dest('dist/js'));
  gulp.src('src/index.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('scss', function () {
  return gulp.src('src/scss/*.scss')
    .pipe(scss())
    .pipe(autoprefixer({ cascade: false }))
    .pipe(gulp.dest('src/css/'))
    // 
    .pipe(browserSync.stream());
});

gulp.task('default', ['serve']);




