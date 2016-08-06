import * as express from 'express';
import { join } from 'path';

import open = require('open');

const app = express();

app.set('views', join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(require('stylus').middleware(join(__dirname, 'styles')));

app.get('/', (req: any, res: any) => {
  res.render('index', { title: 'Express4TS Quick Start' });
});

app.get('/home', (req: any, res: any) => {
  res.send(`
    <a href="/">Express</a>
    <a href="/home">Home</a>
    <a href="/about">About</a>
    <p>Home Page</p>
  `);
});

app.get('/about', (req: any, res: any) => {
  res.send(`
    <a href="/">Express</a>
    <a href="/home">Home</a>
    <a href="/about">About</a>
    <p>About Page</p>
  `);
});

app.use((req: any, res: any) => {
  res.status(404);
  res.send('Not found!');
});

const server = app.listen(3000, 'localhost', () => {
  const { address, port } = server.address();
  open(`http://localhost:${port}`);
  console.log(`Listening on http://localhost:${port}`);
});
