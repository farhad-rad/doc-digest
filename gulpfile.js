const gulp = require("gulp");
const clean = require("gulp-clean");
const run = require("gulp-run");
const fs = require("fs");

gulp.task("clear", function () {
  if (fs.existsSync("dist")) {
    return gulp
      .src("dist/*", {
        read: false,
      })
      .pipe(clean());
  }
  return gulp.src(".");
});

gulp.task("compile", function () {
  return run("npm run server:build", {
    silent: false,
    verbosity: 3,
  }).exec();
});

gulp.task("move", function () {
  return gulp.src("server/dist/**/*").pipe(gulp.dest("dist"));
});

gulp.task("finish-up", function () {
  return gulp
    .src("server/dist/*", {
      read: false,
    })
    .pipe(clean());
});

gulp.task("build", gulp.series("clear", "compile", "move"));
