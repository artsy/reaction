const gulp = require('gulp');
const fsbx = require("fuse-box");
const clean = require('gulp-clean');
const express = require('express');
const path = require('path');
const { dev, production, storybook } = require('./fuse');

let node;

const appName = 'loyalty';
const devReactFolder = `dist/apps/${appName}/development`;
const prodReactFolder = `dist/apps/${appName}/production`;

gulp.task("copy-ui-development-html", ['clean'], () => {
    gulp.src(`src/apps/${appName}/index.html`)
        .pipe(gulp.dest(devReactFolder))
});

gulp.task('clean', function() {
    return gulp.src('dist', { read: false })
        .pipe(clean());
});

gulp.task('dev', ['copy-ui-development-html'], function() {
    return dev({ root: devReactFolder, port: 8080 });
});

gulp.task('storybook', () => {
    return storybook();
});

gulp.task("prod", (done) => {
    return production({ root: prodReactFolder });
});