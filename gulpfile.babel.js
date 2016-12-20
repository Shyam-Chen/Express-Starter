import gulp from 'gulp';
import browsersync from 'browser-sync';

gulp.task('browsersync', () => {
  browsersync({
    proxy: 'http://localhost:8000',
    port: 8080
  });
});
