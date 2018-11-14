var _ = require('ramda');
var fs = require('fs');
var nib = require('nib');
var gulp = require('gulp');
var gutil = require('gulp-util');
var stylus = require('gulp-stylus');
var source = require('vinyl-source-stream');
var watchify = require('watchify');
var coffeeify = require('coffeeify');
var browserify = require('browserify');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync').create();
var RevAll = require('gulp-rev-all');
var awspublish = require('gulp-awspublish');
var del = require('del');
var uglify = require('gulp-uglify');
var minifyCSS = require('gulp-minify-css');

var options, bundle, bundler;

options = _.merge({
  debug: true,
  entries: ['./assets/javascripts/index.coffee'],
  extensions: ['.coffee']
}, watchify.args);

bundler = browserify(options);
bundler.transform(coffeeify);

var bundle = function() {
  return bundler.bundle()
    .on('error', function (err) {
      gutil.log(err.message);
      browserSync.notify('Browserify Error!');
      this.emit('end');
    })
    .pipe(source('index.js'))
    .pipe(gulp.dest('./public/javascripts'))
    .pipe(browserSync.stream({ once: true }));
};

gulp.task('javascripts', function() {
  if (global.isWatching) {
    bundler = watchify(bundler);
    bundler.on('update', bundle);
    bundler.on('log', gutil.log);
  }

  return bundle();
});

gulp.task('stylesheets', function() {
  return gulp.src('./assets/stylesheets/*.styl')
    .pipe(stylus({ use: [nib()] }))
    .pipe(gulp.dest('./public/stylesheets'))
    .pipe(browserSync.reload({ stream: true }));
});

gulp.task('images', function() {
  return gulp.src('./assets/images/*')
    .pipe(gulp.dest('./public/images'));
});

gulp.task('watch', function() {
  browserSync.init({
    open: false,
    port: 3010,
    proxy: 'localhost:3009'
  });

  global.isWatching = true

  gulp.watch([
    './assets/index.styl',
    './apps/*/**/*.styl',
    './components/*/**/*.styl'
  ], ['stylesheets']);

  gulp.watch([
    './apps/*/**/*.jade',
    './components/*/**/*.jade'
  ])
    .on('change', browserSync.reload);
});

gulp.task('teardown', _.partial(del, 'public/*'));

gulp.task('rev', function() {
  var revAll = new RevAll();
  return gulp.src('public/**')
    .pipe(revAll.revision())
    .pipe(gulp.dest('public'))
    .pipe(revAll.manifestFile())
    .pipe(gulp.dest('public'));
});

gulp.task('rev:clean', ['rev'], function(done) {
  var manifest = JSON.parse(fs.readFileSync('public/rev-manifest.json', 'utf8'));
  var toClean = Object.keys(manifest).map(function(path) {
    return 'public/' + path;
  });
  del(toClean, done);
});

gulp.task('compress:javascripts', function() {
  return gulp.src('public/javascripts/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/javascripts'))
});

gulp.task('compress:stylesheets', function() {
  return gulp.src('public/stylesheets/*.css')
    .pipe(minifyCSS())
    .pipe(gulp.dest('public/stylesheets'))
});

gulp.task('build:development', function(done) {
  runSequence(
    'teardown',
    'watch',
    [
      'javascripts',
      'stylesheets',
      'images'
    ],
    done
  );
});

gulp.task('build:production', function(done) {
  runSequence(
    'teardown',
    [
      'javascripts',
      'stylesheets',
      'images'
    ],
    [
      'compress:javascripts',
      'compress:stylesheets'
    ],
    'rev:clean',
    done
  );
});

gulp.task('publish', ['build:production'], function() {
  var aws = {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    params: { Bucket: process.env.AWS_S3_BUCKET },
    region: process.env.AWS_REGION,
  };

  var publisher = awspublish.create(aws);
  var headers = { 'Cache-Control': 'max-age=315360000, no-transform, public' };

  return gulp.src('public/**')
    .pipe(awspublish.gzip({ ext: '.gz' }))
    .pipe(publisher.publish(headers))
    .pipe(publisher.cache())
    .pipe(awspublish.reporter());
});
