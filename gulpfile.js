const { src, dest, parallel, series, watch } = require('gulp');
const browserSyncModule = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const del = require('del');

function scripts() {
    return src('src/js/*.js')
    .pipe(concat('script.js'))
    .pipe(dest('dest/js/'))
    .pipe(uglify())
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dest/js/'))
    .pipe(browserSyncModule.stream())
}

function html() {
    return src('*.html')
    .pipe(browserSyncModule.stream())
}

function styles() {
    return src('src/styles/*.scss')
    .pipe(concat('style.scss'))
    .pipe(sass())
    .pipe(autoprefixer({
        overrideBrowserslist : 'last 5 versions',
        grid: true
    }))
    .pipe(dest('dest/styles/'))
    .pipe(cleanCSS({ level:{ 1:{ specialComments: 0 }}}))
    .pipe(rename({ suffix: '.min' }))
    .pipe(dest('dest/styles/'))
    .pipe(browserSyncModule.stream())
}

function browserSync() {
    browserSyncModule.init({
        server: { baseDir: './' },
        notify: false,
        online: true
    })
}

function images() {
    return src('src/img/**/*')
    .pipe(newer('dest/img/'))
    .pipe(imagemin())
    .pipe(dest('dest/img/'))
}

function cleanDist() {
    return del('dist/**/*')
}

function buildcopy() {
    return src([
        'dest/styles/*.min.css',
        'dest/js/*.min.js',
        'dest/img/**/*',
        'dest/*.html',
    ], { base: 'dest' })
    .pipe(dest('dist'))
}

function startWatch() {
    watch('src/**/*.scss', styles)
    watch('src/**/*.js', scripts)
    watch('*.html', html)
    watch('src/img/**/*', images)
}

exports.browserSync = browserSync;
exports.scripts = scripts;
exports.html = html;
exports.styles = styles;
exports.images = images;

exports.build = series(cleanDist, styles, scripts, images, buildcopy);
exports.default = parallel(styles, html, scripts, images, browserSync, startWatch);