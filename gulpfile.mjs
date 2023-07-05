import gulp from "gulp";
const { series, parallel, src, dest, task } = gulp;
import sass from "gulp-sass";
import postcss from "gulp-postcss";
import autoprefixer from "autoprefixer";
import pxtorem from "postcss-pxtorem";
import browserSync from "browser-sync"; //compile scss into css
import plumber from "gulp-plumber";
import cssnano from "cssnano";
import rename from "gulp-rename";
import babel from "gulp-babel";
import uglify from "gulp-uglify-es";
import csscomb from "gulp-csscomb";
import del from "del";
import sourcemaps from "gulp-sourcemaps";

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