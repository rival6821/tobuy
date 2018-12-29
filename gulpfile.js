var gulp = require('gulp');
var watch = require('gulp-watch')
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var cleanCSS = require('gulp-clean-css');
var minifyjs = require('gulp-js-minify');
var autoprefixer = require('gulp-autoprefixer');

//live reload
gulp.task('check', function() {
    return gulp.src(['*', 'src/js/*', 'src/css/*', 'application/views/*','application/views/*/*',
      'application/controllers/*','application/models/*'])
        .pipe(livereload());
});


//watch
gulp.task('watch', function() {
    livereload.listen();
    gulp.watch('*', ['check']);
    gulp.watch('src/js/*', ['check']);
    gulp.watch('src/js/*', ['minify-js']);
    gulp.watch('src/css/*', ['check']);
    gulp.watch('src/css/*', ['minify-css']);
    gulp.watch('application/views/*', ['check']);
    gulp.watch('application/views/*/*', ['check']);
    gulp.watch('application/controllers/*', ['check']);
    gulp.watch('application/models/*', ['check']);
});

// 일반 컴파일
gulp.task('sass', function () {
  return gulp.src('./src/scss/*.scss')  // 입력 경로
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer( 'last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4' ) )
    .pipe(gulp.dest('./src/css'));  // 출력 경로
});

// 런타임 중 파일 감시
gulp.task('sass:watch', function () {
  gulp.watch('./src/scss/*.scss', ['sass']);  // 입력 경로와 파일 변경 감지 시 실행할 Actions(Task Name)
});


//minify-css
gulp.task('minify-css', () => {
  return gulp.src('./src/css/*.css')
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('./dist/css'));
});


//minifyjs
gulp.task('minify-js', function(){
  gulp.src('./src/js/*.js')
    .pipe(minifyjs())
    .pipe(gulp.dest('./dist/js'));
});


//default 설정
gulp.task('default', ['sass:watch','check','watch','minify-css','minify-js']);