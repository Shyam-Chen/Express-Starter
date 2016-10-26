import * as gulp from 'gulp';
import * as nodemon from 'gulp-nodemon';
import * as browserSync from 'browser-sync';

// ToDo: es2015 modules
const stylus = require('gulp-stylus');
const poststylus = require('poststylus');
const rucksack = require('rucksack-css');

const rollup = require('rollup-stream');
const typescript = require('rollup-plugin-typescript');
const resolve = require('rollup-plugin-node-resolve');
const commonjs = require('rollup-plugin-commonjs');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

// ToDo: Source Maps

gulp.task('compile-stylus-vendor', () => {
  gulp
    .src('./src/public/styles/vendor.styl')
    .pipe(stylus({
      'include css': true,
      'include': 'node_modules',
      use: [poststylus([rucksack({ fallbacks: true, autoprefixer: true })])]
    }))
    .pipe(gulp.dest('./src/public/styles'));
});

// ToDo: merge stream
// Client-side
gulp.task('compile-ts-vendor', () => {
  rollup({
    entry: './src/public/scripts/vendor.ts',
    format: 'iife',
    plugins: [
      typescript(),
      resolve({
        jsnext: true,
        main: true,
        browser: true
      }),
      commonjs()
    ]
  })
  .pipe(source('vendor.js', './src/public/scripts'))
  .pipe(buffer())
  .pipe(gulp.dest('./src/public/scripts'));
});

gulp.task('compile-typescript', () => {
  rollup({
    entry: './src/public/scripts/main.ts',
    format: 'iife',
    plugins: [
      typescript()
    ]
  })
  .pipe(source('main.js', './src/public/scripts'))
  .pipe(buffer())
  .pipe(gulp.dest('./src/public/scripts'));
});

// ToDo: merge stream
// Server-side
gulp.task('compile-ts-2', () => {
  rollup({
    entry: './src/app.ts',
    format: 'cjs',
    plugins: [
      typescript(),
      resolve({
        jsnext: true,
        main: true,
        browser: false
      }),
      commonjs({
        include: 'node_modules/**',
        sourceMap: false
      })
    ]
  })
  .pipe(source('app.js', './src'))
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
