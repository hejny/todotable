


var gulp = require('gulp');
var rename = require('gulp-rename');
var ts = require('gulp-typescript');
var gulpWebpack = require('gulp-webpack');
const webpack = require('webpack');
//const gulpWebpack = require('webpack-stream');
var browserSync = require('browser-sync').create();
var sass = require('gulp-sass');
var runSequence = require('run-sequence');
var fs = require("fs");
var url = require("url");



gulp.task('default',['build-production']);




/*

gulp.task('browser-sync', function() {

    runSequence(
        'browser-sync-init'
        ,'build-css'
        ,'browser-sync-build-js'
        ,'browser-sync-watch');

});


gulp.task('browser-sync-init', function (done) {

    browserSync.init({
        server: {
            baseDir: "./",
            middleware: function(req, res, next) {
                var fileName = url.parse(req.url);
                fileName = fileName.href.split(fileName.search).join("");


                //if(fileName.substr(0,4)=='/api'){}


                var fileExists = fs.existsSync('./' + fileName);
                if (!fileExists && fileName.indexOf("browser-sync-client") < 0) {
                    req.url = "/index.html";
                }
                return next();
            }
        },
        open: false
    });
    done();

});
gulp.task('browser-sync-watch', function (done) {
    gulp.watch("./src/script/**"+"/*.ts",  ['browser-sync-build-js']);
    gulp.watch("./src/script/**"+"/*.tsx", ['browser-sync-build-js']);
    gulp.watch("./src/style/**"+"/*.scss", ['build-css']);
    gulp.watch("./*.html").on('change', browserSync.reload);
    done();
});


gulp.task('browser-sync-build-js', ['build-js'], function (done) {
    browserSync.reload();
    done();
});

/**/





gulp.task('build-production', ['build-js-browser-production','build-js-server-production','build-css']);





gulp.task('build-css', function() {
    return gulp.src("./src/style/index.scss")
        .pipe(sass())
        .pipe(rename("./todotable.css"))
        .pipe(gulp.dest("./dist"))
        .pipe(browserSync.stream());
});






['browser','server'].forEach(function(target) {
    ['development', 'production'].forEach(function (environment) {


        gulp.task('build-js-'+target+'-'+environment, function () {
            return gulp.src('./src/*')
                .pipe(gulpWebpack({
                    entry: {
                        browser: './src/script/'+target+'.tsx'
                    },
                    output: {
                        filename: target+(environment==='production'?'.min':'')+".js",
                        path: __dirname + "/dist"
                    },


                    target: target==='browser'?'web':'node',
                    devtool: "source-map",
                    resolve: {
                        extensions: ["", ".webpack.js", ".web.js", ".ts", ".tsx", ".js", '.json', 'index.json']
                    },

                    module: {
                        loaders: [
                            {
                                test: /\.ts(x?)$/,
                                loader: 'ts-loader'
                            },
                            {
                                test: /\.json$/,
                                loader: "json-loader"
                            }
                        ],


                        preLoaders: [
                            {test: /\.js$/, loader: "source-map-loader"},
                        ]
                    },


                    plugins: [
                        new webpack.DefinePlugin({ "global.GENTLY": false })
                    ],


                    /*externals: {
                        "react": "React",
                        "react-dom": "ReactDOM"
                    }*/

                }))
                .pipe(gulp.dest('./dist/'));
        });





    });
});










