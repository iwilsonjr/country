const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const pxtorem = require('postcss-pxtorem');
const browserSync = require('browser-sync').create(); //compile scss into css
const plumber = require('gulp-plumber');
const cssnano = require("cssnano");
const rename = require("gulp-rename");
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const csscomb = require('gulp-csscomb');
const del = require("del");

const processors = [
    pxtorem({
        rootValue: 10,
        unitPrecision: 5,
        propList: ['font*', 'line-height', 'letter-spacing', 'word-spacing', 'margin*', 'padding*'],
        replace: true
    }),
    autoprefixer()
];

function styles() {
    return gulp.src('app/build/css/*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(csscomb())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src('app/build/js/widget.js')
        .pipe(plumber())
        .pipe(babel({
            presets: [
                ['@babel/env', {
                    modules: false
                }]
            ]
        }))
        .pipe(gulp.dest('app/js'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: "./app",
            index: "/index.html"
        }
    });
    gulp.watch('./build/css/*.scss', styles)
    gulp.watch('./build/js/widget.js', scripts)
    gulp.watch('./index.html').on('change', browserSync.reload);
    gulp.watch('./js/widget.js').on('change', browserSync.reload);
}

function buildcss() {
    return gulp.src('app/css/*.css')
        .pipe(plumber())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(postcss([cssnano()]))
        .pipe(gulp.dest('app/dist/css'))
}

function buildjs() {
    return gulp.src('app/js/widget.js')
        .pipe(plumber())
        .pipe(rename({ extname: '.min.js' }))
        .pipe(uglify())
        .pipe(gulp.dest('app/dist/js'))
}

// Clean assets
function cleanstyles() {
    return del(["app/dist/css/"]);
}

function cleanscripts() {
    return del(["app/dist/js"]);
}

exports.watch = watch;
exports.styles = styles;
exports.scripts = scripts;
exports.default = gulp.series(styles, scripts, watch);
exports.build = gulp.series(gulp.parallel(styles, scripts), gulp.parallel(cleanstyles, cleanscripts), gulp.parallel(buildcss, buildjs));

//Testing Processes
exports.prodcss = buildcss;
exports.prodjs = buildjs;
exports.clean = gulp.parallel(cleanstyles, cleanscripts);