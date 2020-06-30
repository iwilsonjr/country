const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const browserSync = require('browser-sync').create(); //compile scss into css
const plumber = require('gulp-plumber');
const cssnano = require("cssnano");

const processors = [
    pxtorem({
        rootValue: 10,
        unitPrecision: 5,
        propList: ['font*', 'line-height', 'letter-spacing', 'word-spacing', 'margin*', 'padding*'],
        replace: true
    }),
    autoprefixer()
];

function style() {
    return gulp.src('app/build/css/widget.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss(processors))
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

function buildcss() {
    return gulp.src('app/css/widget.css')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss(cssnano()))
        .pipe(gulp.dest('app/css'))
}

function buildjs() {

}

exports.watch = watch;
exports.style = style;
exports.default = gulp.series(style, watch);
exports.build = gulp.parallel(buildcss, buildjs);