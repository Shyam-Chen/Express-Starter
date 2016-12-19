import gulp from 'gulp';
import nodemon from 'gulp-nodemon';
import browserSync from 'browser-sync';

import rollup from 'rollup-stream';
import typescript from 'rollup-plugin-typescript';
import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import uglify from 'rollup-plugin-uglify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';

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
