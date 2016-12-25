var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var minifyInline = require('gulp-minify-inline');
var inline = require('gulp-inline');
var inlineimage = require('gulp-inline-image');

// 获取 gulp-imagemin 模块
var imagemin = require('gulp-imagemin')

// 压锟斤拷 public 目录 css
gulp.task('minify-css', function () {
    return gulp.src('./public/**/*.css')
		.pipe(inlineimage())
        .pipe(minifycss())
        .pipe(gulp.dest('./public'));
});
gulp.task('plugins-css', function () {
    return gulp.src('./public/plugins/**/*.css')
		.pipe(inlineimage())
        .pipe(minifycss())
        .pipe(gulp.dest('./public/plugins'));
});
gulp.task('search-css', function () {
    return gulp.src('./public/search/**/*.css')
		.pipe(inlineimage())
        .pipe(minifycss())
        .pipe(gulp.dest('./public/search'));
});
gulp.task('mylove-css', function () {
    return gulp.src('./public/mylove/**/*.css')
		.pipe(inlineimage())
        .pipe(minifycss())
        .pipe(gulp.dest('./public/mylove'));
});

// 压缩 public 目录内 html
gulp.task('minify-html', function () {
    var opts = {
        removeComments: true,//清除 HTML 注释
        minifyJS: true,////压缩页面 JS
        minifyCSS: true,//压缩页面 CSS
        minifyURLs: true,
        collapseWhitespace: true,//压缩 HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除 <script> 的 type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除 <style> 和 <link> 的 type="text/css"
    };
    return gulp.src('./public/**/*.html')
		.pipe(minifyInline())
        .pipe(htmlclean())
        .pipe(htmlmin(opts))
        .pipe(gulp.dest('./public'));
});


// 压缩 public 目录内 js
gulp.task('minify-js', function () {
    return gulp.src('./public/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});
gulp.task('plugins-js', function () {//不能压缩，否则代码块高亮无效
    return gulp.src('./public/plugins/prettify/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/plugins/prettify'));
});
gulp.task('search-js', function () {
    return gulp.src('./public/search/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/search/js'));
});
gulp.task('running-js', function () {
    return gulp.src('./public/running/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/running/js'));
});
gulp.task('mylove-js', function () {
    return gulp.src('./public/mylove/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/mylove/js'));
});

// 压缩 public 目录内 image
gulp.task('images', function () {
    gulp.src('./public/img/*.*')
        .pipe(imagemin({
            progressive: true
        }))
        .pipe(gulp.dest('./public/img/'));
});

gulp.task('images-about', function () {
    gulp.src('./public/about/*.*')
        .pipe(imagemin({
            progressive: true //类型：Boolean 默认：false 无损压缩jpg图片
        }))
        .pipe(gulp.dest('./public/about/'));
});


 //执行 gulp 命令时执行的任务
gulp.task('build', [
    'minify-html', 'minify-css', 'search-css', 'mylove-css', 'minify-js', 'search-js', 'running-js', 'mylove-js', 'images', 'images-about'
]);