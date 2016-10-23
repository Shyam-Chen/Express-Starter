import * as gulp from 'gulp';
import * as nodemon from 'gulp-nodemon';
import * as browserSync from 'browser-sync';

const stylus = require('stylus');
const poststylus = require('poststylus');
const rucksack = require('rucksack-css');

const rollup = require('rollup-stream');
const typescript = require('rollup-plugin-typescript');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');

/*gulp.task('compile-stylus', () => {
  let shared = (vendor, map) => {
    let opts = {
      'include css': true,
      'include': 'node_modules',
      use: [
        poststylus([
          rucksack({
            fallbacks: true,
            autoprefixer: true
          })
        ])
      ]
    };

    let combined = combiner(
      changed(STYLES_DEST),
      gulpif(map, sourcemaps.init({ loadMaps: true })),
      gulpif(vendor, cache('vendor')),
      stylus(opts), nano(),
      gulpif(vendor, remember('vendor')),
      gulpif(vendor, concat('vendor.css')),
      gulpif(map, sourcemaps.write('./')),
      gulp.dest(STYLES_DEST),
      browserSync.stream()
    );

    return combined.on('error', CompileError.handle);
  };

  let vendor = gulp.src(path.join(STYLES_SRC, 'vendor.styl')).pipe(shared(true, false));
  let main = gulp.src(path.join(STYLES_SRC, 'main.styl')).pipe(shared(false, ENV === 'dev'));

  return merge(vendor, main);
});*/

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
