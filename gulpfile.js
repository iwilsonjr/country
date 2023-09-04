const gulp = require("fix-esm").require('gulp');
const sass = require("fix-esm").require('gulp-sass');
const postcss = require("fix-esm").require('gulp-postcss');
const autoprefixer = require("fix-esm").require('autoprefixer');
const pxtorem = require("fix-esm").require('postcss-pxtorem');
const browserSync = require("fix-esm").require('browser-sync').create(); //compile scss into css
const plumber = require("fix-esm").require('gulp-plumber');
const cssnano = require("fix-esm").require("cssnano");
const rename = require("fix-esm").require("gulp-rename");
const babel = require("fix-esm").require('gulp-babel');
const uglify = require("fix-esm").require('gulp-uglify-es').default;
const csscomb = require("fix-esm").require('gulp-csscomb');
const del = require("fix-esm").require("del");
const sourcemaps = require("fix-esm").require('gulp-sourcemaps');

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
    return gulp.src('app/build/css/**/*.scss')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss(processors))
        .pipe(csscomb())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.stream());
}

function scripts() {
    return gulp.src('app/build/js/**/*.js')
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: [
                ['@babel/env', {
                    modules: false
                }]
            ]
        }))
        .pipe(sourcemaps.write('.'))
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
    gulp.watch('app/build/css/**/*.scss', styles)
    gulp.watch('app/build/js/**/*.js', scripts)
    gulp.watch('app/index.html').on('change', browserSync.reload);
    //gulp.watch('app/js/widget.js').on('change', browserSync.reload);
}

function buildcss() {
    return gulp.src('app/css/*.css')
        .pipe(plumber())
        .pipe(rename({ extname: '.min.css' }))
        .pipe(postcss([cssnano()]))
        .pipe(gulp.dest('app/dist/css'))
}

function buildjs() {
    return gulp.src('app/js/*.js')
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