const babel = require('gulp-babel');
const gulp = require('gulp');
const clean = require('gulp-clean');
const tsc = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');

let node;

// TODO: read app name from command line option
const appName = 'loyalty';

gulp.task('clean', function() {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

gulp.task('compile-server', () => {
    const tsProject = tsc.createProject('tsconfig.json')

    const tsResult = gulp.src(`src/**/*.{ts,tsx}`)
        .pipe(sourcemaps.init())
        .pipe(tsProject())

    return tsResult.js
        .pipe(babel())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
})
