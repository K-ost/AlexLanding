// New gulp 4 gulpfile
const gulp = require('gulp'),
    sass = require('gulp-sass')(require('sass')),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    fileinclude = require('gulp-file-include'),
    watch = require('gulp-watch');
const browserSync = require('browser-sync').create();

// Пути к таскам
var path = {
    build: {
        html: 'public/',
        js: 'public/js/',
        fonts: 'public/fonts/',
        css: 'public/css/',
        img: 'public/images/'
    },
    src: {
        html: 'app/*.html',
        js: 'app/js/**/*.js',
        fonts: 'app/fonts/*',
        style: ['app/sass/styles.scss'],
        css: 'app/css/*.css',
        img: 'app/images/**/*.*'
    },
    watch: {
        html: 'app/**/*.html',
        js: 'app/js/**/*.js',
        fonts: 'app/fonts/*',
        style: 'app/sass/*.scss',
        css: 'app/css/*.css',
        img: 'app/images/**/*.*'
    },
    clean: './public'
};

// Clean
gulp.task('clean', async function() {
    del.sync('public')
});

// Html
gulp.task('html', async function() {
    gulp.src(path.src.html)
        .pipe(fileinclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest(path.build.html))
        .pipe(browserSync.stream());
});

// JS
gulp.task('js', async function () {
    gulp.src(path.src.js)
        .pipe(gulp.dest(path.build.js))
        .pipe(browserSync.stream());
});

// Fonts
gulp.task('fonts', async function () {
    gulp.src(path.src.fonts)
        .pipe(gulp.dest(path.build.fonts))
});

// Sass
gulp.task('scss', async function () {
    gulp.src(path.src.style)
        .pipe(sass())
        .pipe(gulp.dest(path.build.css))
        .pipe(browserSync.stream());
});

// Css vendor
gulp.task('css', async function () {
    gulp.src(path.src.css)
        .pipe(concat('scripts.css'))
        .pipe(gulp.dest(path.build.css))
});

// Image
gulp.task('img', async function () {
    gulp.src(path.src.img)
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(gulp.dest(path.build.img))
});

// Watch
gulp.task('watch', async function() {
    // browserSync
    browserSync.init({
        server: {
            baseDir: "./public/"
        }
    })
    gulp.watch([path.watch.html], gulp.parallel('html'));
    gulp.watch([path.watch.style], gulp.parallel('scss'));
    gulp.watch([path.watch.js], gulp.parallel('js'));
    gulp.watch([path.watch.fonts], gulp.parallel('fonts'));
    gulp.watch([path.watch.img], gulp.parallel('img'));
    gulp.watch([path.watch.css], gulp.parallel('css'));
});


gulp.task('public', gulp.series('clean'))
gulp.task('default', gulp.parallel('css' ,'scss', 'js', 'fonts', 'watch'));




