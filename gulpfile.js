'use strict';

const gulp          = require('gulp');
const sass          = require('gulp-sass');
const sourcemaps    = require('gulp-sourcemaps');
const debug         = require('gulp-debug');
const uglify        = require('gulp-uglify');
const cssnano       = require('gulp-cssnano');
const concat        = require('gulp-concat');
const gulpIf        = require('gulp-if');
const del           = require('del');
const autoprefixer  = require('gulp-autoprefixer');

var paths = {
	bower:  './bower_components',
	assets: './assets'
};

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';

gulp.task('styles', function() {

	return gulp.src([
        paths.bower  + '/bootstrap/dist/css/bootstrap.css',
        paths.bower  + '/bootstrap-material-design/dist/css/{bootstrap-material-design,ripples}.css',
        paths.bower  + '/okaynav/app/css/okayNav-base.css',
        paths.bower  + '/okaynav/app/css/okayNav-theme.css',
        paths.assets + '/styles/**/*.scss'
	])
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(concat('app.css'))
        .pipe(cssnano())
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest('./public/css'));

});

gulp.task('scripts', function() {

    return gulp.src([
        paths.bower  + '/jquery/dist/jquery.js',
        paths.bower  + '/bootstrap/dist/js/bootstrap.js',
        paths.bower  + '/bootstrap-material-design/scripts/{material,ripples}.js',
        paths.bower  + '/okaynav/dist/js/jquery.okayNav-min.js',
        paths.assets + '/scripts/**/*.js'
    ])
        .pipe(gulpIf(isDevelopment, sourcemaps.init()))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(gulpIf(isDevelopment, sourcemaps.write()))
        .pipe(gulp.dest('./public/js'));
});

gulp.task('clean', function() {
    return del([
        './public/css',
        './public/js'
    ]);
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('styles', 'scripts'))
);

gulp.task('watch', function() {
    gulp.watch('assets/styles/**/*.*', gulp.series('styles'));

    gulp.watch('assets/scripts/**/*.*', gulp.series('scripts'));
});

gulp.task('dev',
    gulp.series('build', gulp.parallel('watch'))
);