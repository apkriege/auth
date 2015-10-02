//var elixir = require('laravel-elixir');

/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

//elixir(function(mix) {
//    mix.sass('app.scss');
//});

//works
var gulp = require('gulp');

var files = [
    'node_modules/**/*.*',
    '!node_modules/bootstrap-sass/**',
    '!node_modules/gulp/**',
    '!node_modules/laravel-elixir/**'
];

gulp.task('move', function(){
  gulp.src(files, {base: './'}).pipe(gulp.dest('public/assets'));
});

gulp.task('default', ['move']);

