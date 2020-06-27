const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create(); //compile scss into css

function style() {
    return gulp.src('app/build/css/widget.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./app",
            index: "/index.html"
        }
    });
    gulp.watch('./build/css/widget.scss', style)
    gulp.watch('./*.html').on('change', browserSync.reload);
    //gulp.watch('./js/*.js').on('change', browserSync.reload);
}

exports.watch = watch;
exports.style = style;