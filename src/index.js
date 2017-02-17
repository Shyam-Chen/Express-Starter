// import { join } from 'path';

import express from 'express';
import mongoose from 'mongoose';
import prerender from 'prerender-node';
import bodyParser from 'body-parser';

import { route } from './routes';

const app = express();

mongoose.connect(
  'mongodb://expressmongoose:expressmongoose@ds031167.mlab.com:31167/expressmongoose-starter-kit', {
    server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
    replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } }
  }
);

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => console.log('Connection Succeeded.'));

app.set('port', (process.env.PORT || 8000));

// app.use(express.static(join(__dirname, '..', 'public')));
app.use(prerender);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(route);

app.listen(app.get('port'), () => {
  console.log('Bootstrap Succeeded.');
  console.log(`Port: ${app.get('port')}.`);
});

// import pm2 from 'pm2';

// pm2.connect(() => {
//   pm2.start({
//     script: './server.js',
//     name: 'Backend-Starter-Kit',
//     exec_mode: 'cluster',
//     instances: process.env.WEB_CONCURRENCY || -1,
//     max_memory_restart: `${process.env.WEB_MEMORY || 512}M`,
//   },
//   (err) => {
//     if (err) return console.error(`Error while launching applications ${err.stack || err}.`);
//     console.log('PM2 and application has been succesfully started.');
//
//     pm2.launchBus((err, bus) => {
//       console.log('PM2: Log streaming started.');
//       bus.on('log:out', (packet) => console.log(`App (out): ${packet.process.name} - ${packet.data}`));
//       bus.on('log:err', (packet) => console.error(`App (err): ${packet.process.name} - ${packet.data}`));
//     });
//   });
// });
