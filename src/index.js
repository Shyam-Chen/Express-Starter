import express from 'express';
import mongoose from 'mongoose';

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

app.get('/', (req, res) => {
  res.send('Backend Starter Kit');
});

app.listen(app.get('port'), () => {
  console.log('Bootstrap Succeeded.');
  console.log(`Port: ${app.get('port')}.`);
});
