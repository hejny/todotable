


var gulp = require('gulp');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var webpack = require('gulp-webpack');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');


gulp.task('default',['build']);




gulp.task('build', ['build-js','build-css']);





// Static server
gulp.task('browser-sync', function() {


    browserSync.init({
        server: {
            baseDir: "./"
        },
        open: false
    });



    gulp.watch("./src/script/**/*.ts?", ['browser-sync-build-js']);
    gulp.watch("./src/style/**/*.scss", ['build-css']);

    gulp.watch("./*.html").on('change', browserSync.reload);

});





gulp.task('browser-sync-build-js', ['build-js'], function (done) {
    browserSync.reload();
    done();
});






gulp.task('build-css', function() {
    return gulp.src("./src/style/index.scss")
        .pipe(sass())
        .pipe(rename("./todoapp.css"))
        .pipe(gulp.dest("./dist"))
        .pipe(browserSync.stream());
});




gulp.task('build-js', function() {
    return gulp.src('./src/*')
        .pipe(webpack({
            entry: {
                todotable: "./src/script/index.tsx"
            },
            output: {
                filename: "[name].js",
                path: __dirname + "/dist",
                libraryTarget: 'var',
                library: 'TodoTable'
            },

            devtool: "source-map",

            resolve: {
                extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js"]
            },

            module: {
                loaders: [
                    {
                        test: /\.ts(x?)$/,
                        loader: 'ts-loader'
                    }
                ],


                preLoaders: [
                    { test: /\.js$/, loader: "source-map-loader" }
                ]
            },


            externals: {
                "react": "React",
                "react-dom": "ReactDOM"
            }

        }))
        .pipe(gulp.dest('./dist/'));
});














