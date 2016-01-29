var gulp = require("gulp");
var gutil = require("gulp-util");
var sass = require("gulp-sass");
var eslint = require("gulp-eslint");
var webpack = require("webpack-stream");
var assign = require("lodash").assign;

var devConfig = {
    devtool: "cheap-module-source-map",
    context: __dirname + "/src",
    plugins: [],
    output: {
        filename: "client.js",
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loaders: ["babel-loader"],
            }
        ],
    }
};

var prodConfig = assign({}, devConfig);
prodConfig.plugins = prodConfig.plugins.concat(
    new webpack.webpack.DefinePlugin({
        "process.env": {
            // This has effect on the react lib size
            "NODE_ENV": JSON.stringify("production")
        }
    }),
    new webpack.webpack.optimize.DedupePlugin(),
    new webpack.webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.webpack.optimize.UglifyJsPlugin()
);

gulp.task("default", ["build-dev"]);
gulp.task("build", ["sass", "icons", "images", "webpack:build"]);
gulp.task("build-dev", ["webpack:build-dev", "sass", "icons", "images", "lint"], function () {
    gulp.watch("src/**/*.js", ["webpack:build-dev", "lint"]);
    gulp.watch("src/scss/*.scss", ["sass"]);
    gulp.watch("src/images/*.scss", ["images"]);
});

gulp.task("lint", function () {
    return gulp.src("src/**/*.js")
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task("sass", function () {
    return gulp.src("src/client/scss/styles.scss")
    .pipe(sass({ includePaths: ["node_modules/bootstrap-sass/assets/stylesheets", "node_modules/font-awesome/scss"] }))
    .pipe(gulp.dest("dist"));
});

gulp.task("webpack:build-dev", function () {
    return gulp.src("src/common/client.js")
    .pipe(webpack(devConfig))
    .pipe(gulp.dest("dist"));
});

gulp.task("webpack:build", function (callback) {
    return gulp.src("src/common/client.js")
    .pipe(webpack(prodConfig))
    .pipe(gulp.dest("dist"));
});

gulp.task("icons", function () {
    return gulp.src("./node_modules/font-awesome/fonts/*.*")
        .pipe(gulp.dest("./dist/fonts"));
});

gulp.task("images", function () {
    return gulp.src("./src/client/images/**/*.*")
        .pipe(gulp.dest("./dist/img"));
});
