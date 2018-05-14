var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var sass = require('gulp-sass');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');

gulp.task('public-images', function(){
    gulp.src('assets/public/src/img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('assets/public/dist/img/'));
});
gulp.task('admin-images', function(){
    gulp.src('assets/admin/src/img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('assets/admin/dist/img/'));
});

gulp.task('public-styles', function(){
var options = {
    outputStyle: 'compressed',
};
gulp.src(['assets/public/src/scss/**/*.scss'])
    .pipe(plumber({
        errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
    .pipe(sass(options))
    .pipe(postcss([ autoprefixer({ browsers: ['last 5 versions'] }) ]))
    .pipe(gulp.dest('assets/public/dist/css/'))
});

gulp.task('admin-styles', function(){
var options = {
    outputStyle: 'compressed',
};
gulp.src(['assets/admin/src/scss/**/*.scss'])
    .pipe(plumber({
        errorHandler: function (error) {
            console.log(error.message);
            this.emit('end');
        }}))
    .pipe(sass(options))
    .pipe(postcss([ autoprefixer({ browsers: ['last 5 versions'] }) ]))
    .pipe(gulp.dest('assets/admin/dist/css/'))
});


gulp.task('public-scripts', function(){
    return gulp.src('assets/public/src/js/**/*.js')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('assets/public/dist/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('assets/public/dist/js/'))
});

gulp.task('admin-scripts', function(){
    return gulp.src('assets/admin/src/js/**/*.js')
        .pipe(plumber({
            errorHandler: function (error) {
                console.log(error.message);
                this.emit('end');
            }}))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('assets/admin/dist/js/'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('assets/admin/dist/js/'))
});

gulp.task('direct-stripe', function(){
    gulp.watch("assets/public/src/scss/**/*.scss", ['public-styles']);
    gulp.watch("assets/admin/src/scss/**/*.scss", ['admin-styles']);
    gulp.watch("assets/public/src/img/**/*", ['public-images']);
    gulp.watch("assets/admin/src/img/**/*", ['admin-images']);
    gulp.watch("assets/public/src/js/**/*.js", ['public-scripts']);
    gulp.watch("assets/admin/src/js/**/*.js", ['admin-scripts']);
});