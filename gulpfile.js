const babel = require('gulp-babel');
const gulp = require('gulp');
const fsbx = require("fuse-box");
const clean = require('gulp-clean');
const tsc = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const express = require('express');
const path = require('path');
const { dev, storybook } = require('./fuse');

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
        .pipe(babel({
            presets: [
                "es2015",
                "stage-3",
                "react"
            ],
            plugins: [
                "react-relay"
            ],
            retainLines: true
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist'))
})

gulp.task('dev', ['compile-server'], function() {
    return dev({ root: `dist/apps/${appName}/server`, port: 3000 });
});

gulp.task('storybook', () => {
    return storybook();
});

gulp.task('start', ['storybook', 'dev']);