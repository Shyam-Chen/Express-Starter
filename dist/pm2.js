'use strict';

var _pm = require('pm2');

var _pm2 = _interopRequireDefault(_pm);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_pm2.default.connect(() => {
  _pm2.default.start({
    name: 'Backend-Starter-Kit',
    script: `${__dirname}/app.js`,
    max_memory_restart: `${process.env.WEB_MEMORY || 512}M`,
    exec_mode: 'cluster',
    instances: process.env.WEB_CONCURRENCY || -1
  }, err => {
    if (err) return console.error(`Error while launching applications ${err.stack || err}.`);
    console.log('PM2 and application has been succesfully started.');

    _pm2.default.launchBus((err, bus) => {
      console.log('PM2: Log streaming started.');
      bus.on('log:out', packet => console.log(`App (out): ${packet.process.name} - ${packet.data}`));
      bus.on('log:err', packet => console.error(`App (err): ${packet.process.name} - ${packet.data}`));
    });
  });
});