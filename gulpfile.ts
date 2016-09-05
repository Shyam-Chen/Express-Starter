import * as gulp from 'gulp';
import * as nodemon from 'gulp-nodemon';
import * as browserSync from 'browser-sync';

gulp.task('default', ['browser-sync'], () => { });

gulp.task('browser-sync', ['nodemon'], () => {
  let config: any = {
    proxy: 'http://localhost:3001',
    port: 3000,
  };
	browserSync(config);
});

gulp.task('nodemon', (done: any) => {
	let started: boolean = false;
	return nodemon({
		script: 'src/app.js'
	})
  .on('start', () => {
		if (!started) {
			started = true;
      done();
		}
	})
  .on('restart', () => {
    setTimeout(() => browserSync.reload(), 1000);
  });
});
