import * as gulp from 'gulp';
import * as nodemon from 'gulp-nodemon';
import * as browserSync from 'browser-sync';

const rollup = require('rollup-stream');
const typescript = require('rollup-plugin-typescript');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

gulp.task('public', () => {
  rollup({
    entry: './src/public/static.ts',
    format: 'iife',
    plugins: [
      typescript()
    ]
  })
  .pipe(source('main.js'))
  .pipe(buffer())
  .pipe(gulp.dest('./src/public'));
});

gulp.task('app', () => {
  rollup({
    entry: './src/app.ts',
    format: 'cjs',
    plugins: [
      typescript(),
      resolve({ jsnext: true, main: true, browser: false }),
      commonjs({ include: 'node_modules/**' })
    ]
  })
  .pipe(source('app.js'))
  .pipe(buffer())
  .pipe(gulp.dest('./src'));
});

gulp.task('nodemon', () => {
  nodemon({
    script: 'src/app.js'
  });
});

gulp.task('browser-sync', () => {
  browserSync({
    proxy: 'http://localhost:2999',
    port: 3000
  });
});

gulp.task('default', ['nodemon', 'browser-sync']);
