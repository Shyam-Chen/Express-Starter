import { join } from 'path';

import * as express from 'express';
import * as mongoose from 'mongoose';

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as logger from 'morgan';
import * as errorhandler from 'errorhandler';

import { route } from './routes';

class Server {
  public app: express.Express;

  public static bootstrap(): Server {
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

    return new Server();
  }

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.set('port', (process.env.PORT || 2999));
    this.app.set('views', join(__dirname, 'views'));
    this.app.set('view engine', 'pug');

    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(bodyParser.json());
    this.app.use(cookieParser());

    this.app.use(logger('dev'));

    this.app.use(express.static(join(__dirname, 'public')));

    this.app.use(route);

    this.app.use(errorhandler());

    this.app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
      interface Error { status?: number; }
      const err: Error = new Error('Not Found');
      err.status = 404;
      next(err);
    });

    this.app.listen(this.app.get('port'), () => {
      console.log('Bootstrap Succeeded.');
    });
  }
}

const server = Server.bootstrap();
export = server.app;
