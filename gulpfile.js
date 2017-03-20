const gulp = require('gulp');
const fsbx = require("fuse-box");
const clean = require('gulp-clean');
const tsc = require('gulp-typescript');
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
    const tsProject = tsc.createProject('tsconfig.json', {
        target: "es5",
    })

    return gulp.src(`src/**/*.{ts,tsx}`)
        .pipe(tsProject())
        .pipe(gulp.dest('dist'))
})

gulp.task('dev', ['compile-server'], function() {
    return dev({ root: `dist/apps/${appName}/server`, port: 3000 });
});

gulp.task('storybook', () => {
    return storybook();
});

gulp.task('start', ['storybook', 'dev']);