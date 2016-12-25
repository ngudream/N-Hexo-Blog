var gulp = require('gulp');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var htmlmin = require('gulp-htmlmin');
var htmlclean = require('gulp-htmlclean');
var minifyInline = require('gulp-minify-inline');
var inline = require('gulp-inline');
var inlineimage = require('gulp-inline-image');

// ��ȡ gulp-imagemin ģ��
var imagemin = require('gulp-imagemin')

// ѹ�� public Ŀ¼ css
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

// ѹ�� public Ŀ¼�� html
gulp.task('minify-html', function () {
    var opts = {
        removeComments: true,//��� HTML ע��
        minifyJS: true,////ѹ��ҳ�� JS
        minifyCSS: true,//ѹ��ҳ�� CSS
        minifyURLs: true,
        collapseWhitespace: true,//ѹ�� HTML
        collapseBooleanAttributes: true,//ʡ�Բ������Ե�ֵ <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//ɾ�����пո�������ֵ <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//ɾ�� <script> �� type="text/javascript"
        removeStyleLinkTypeAttributes: true,//ɾ�� <style> �� <link> �� type="text/css"
    };
    return gulp.src('./public/**/*.html')
		.pipe(minifyInline())
        .pipe(htmlclean())
        .pipe(htmlmin(opts))
        .pipe(gulp.dest('./public'));
});


// ѹ�� public Ŀ¼�� js
gulp.task('minify-js', function () {
    return gulp.src('./public/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'));
});
gulp.task('plugins-js', function () {//����ѹ�����������������Ч
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

// ѹ�� public Ŀ¼�� image
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
            progressive: true //���ͣ�Boolean Ĭ�ϣ�false ����ѹ��jpgͼƬ
        }))
        .pipe(gulp.dest('./public/about/'));
});


 //ִ�� gulp ����ʱִ�е�����
gulp.task('build', [
    'minify-html', 'minify-css', 'search-css', 'mylove-css', 'minify-js', 'search-js', 'running-js', 'mylove-js', 'images', 'images-about'
]);