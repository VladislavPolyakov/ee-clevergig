// Includes
var gulp            = require('gulp'),
    source          = require('vinyl-source-stream'),
    buffer          = require('vinyl-buffer'),
    gutil           = require('gulp-util'),
    sass            = require('gulp-sass'),
    browserSync     = require('browser-sync').create(),
    htmlInjector    = require("bs-html-injector"),
    cssnano         = require('gulp-cssnano'),
    uglify          = require('gulp-uglify'),
    sourcemaps      = require('gulp-sourcemaps'),
    autoprefixer    = require('gulp-autoprefixer'),
    imagemin        = require('gulp-imagemin'),
    cache           = require('gulp-cache'),
    globbing        = require('gulp-css-globbing'), //globing scss files from folders
    notify 			= require("gulp-notify"),
    size 			= require('gulp-size'),
    nunjucks        = require('gulp-nunjucks-html'),
    argv            = require('yargs').argv,
    gulpif          = require('gulp-if'),
    replace         = require('gulp-replace');


var sassOptions = {
  errLogToConsole: true,
  // outputStyle: 'expanded',
};

gulp.task('browserSync', function() {
  browserSync.use(htmlInjector, {
    files: "public/*.html"
  });
  browserSync.init({
    // host : '192.168.0.158', //set it mannually if you use virtualbox
    // proxy: "localhost:9410",
    // files: "public/css/*.css",
    // injectChanges: true,
    server: {
      baseDir: 'public',
      directory: true
    },
  })
})

// Styles: soursemaps + minification + autoprefixer + browsersync
gulp.task('styles', function () {
  return gulp
    .src('assets/scss/*.scss')
    .pipe(globbing({
        extensions: ['.scss']
    }))
    .pipe(sourcemaps.init())
    .pipe(sass(sassOptions)
    .on("error", notify.onError(function (error) { return "CSS not builded: " + error.message; }))) //if not builded show error message
    .pipe(autoprefixer({ browsers: ['last 2 versions', 'safari >= 4'] })) //safari needed for phantomjs flexbox supporting
    .pipe(gulpif(argv.production, cssnano()))
    .pipe(gulpif(!argv.production, sourcemaps.write('maps')))
    .pipe(size())
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.stream({match: '**/*.css'}))
});

// Images optimization
gulp.task('images', function(){
  return gulp
    .src('assets/img/**/*.+(png|jpg|gif|svg)')
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(size())
    .pipe(gulp.dest('public/img'))
});


gulp.task('nunjucks', function() {
  return gulp.src('assets/pages/**/*.+(html|nunjucks)')
    .pipe(nunjucks({
      searchPaths: ['assets/templates'],
      tags: {
          variableStart: '<$',
          variableEnd: '$>',
          }
    }))
    .pipe(gulp.dest('public'));
});


// Watch Files For Changes
gulp.task('watch', ['browserSync', 'nunjucks', 'styles'], function() {
  gulp.watch("assets/**/*.html", ['nunjucks']);
  gulp.watch('assets/scss/**/*.scss', ['styles']);
  gulp.watch('assets/img/**/*.+(png|jpg|gif|svg)', ['images']);
});

// gulp.task('build', [ 'styles'], function() { console.log('GOOD TO GO'); });
