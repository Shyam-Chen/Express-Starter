import express from 'express';
import mongoose from 'mongoose';

const app = express();

const dbuser = process.env.DBUSER || 'expressmongoose';
const dbpassword = process.env.DBPASSWORD || 'expressmongoose';
const dburl = process.env.DBURL || 'ds031167.mlab.com:31167/expressmongoose-starter-kit';
const mongodbUri = `mongodb://${dbuser}:${dbpassword}@${dburl}`;
const options = {
  server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
  replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } }
};

mongoose.connect(mongodbUri, options);

const conn = mongoose.connection;
conn.on('error', console.error.bind(console, 'connection error:'));
conn.once('open', () => console.log('Connection Succeeded.'));

app.set('port', (process.env.PORT || 8000));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(app.get('port'), () => {
  console.log('App listening on port 8000!');
});
