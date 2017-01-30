var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var browserSync = require('browser-sync').create();


gulp.task('sass', function () {
    return gulp.src('./public/css/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest('./public/css'))
        .pipe(browserSync.stream());

});

gulp.task('serve', ['sass'], function() {

    browserSync.init({
        proxy: "localhost:3000"
    });

    gulp.watch("./public/css/*.scss", ['sass']);
    gulp.watch("./public/*.html").on('change', browserSync.reload);
});