var gulp = require('gulp');
var util = require('gulp-util');
var config = require('./gulp.config')();
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
    log('Compiling SASS --> CSS');
    log(config);
    return gulp
    .src(config.scssLocation)
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
    .pipe(gulp.dest(config.cssLocation))
})

gulp.task('sass:watch', function () {
  gulp.watch(config.scssLocation, ['styles']);
});


gulp.task('wiredep', function() {

    var wiredep = require('wiredep').stream;
    var options = {

    }
    return gulp
    .src('index.html')
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src()))
    .pipe(gulp.dest('/'))
})


///
function log(msg) {
    util.log(msg);
}
