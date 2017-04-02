import pm2 from 'pm2';

pm2.connect(() => {
  pm2.start(
    {
      name: 'Backend-Starter-Kit',
      script: 'server.js',
      args: '--interpreter node_modules/.bin/babel-node',
      cwd: process.cwd(),
      maxMemoryRestart: `${process.env.WEB_MEMORY || 512}M`,
      execMode: 'cluster',
      instances: process.env.WEB_CONCURRENCY || -1
    },
    err => {
      if (err) return console.error(`Error while launching applications ${err.stack || err}.`);
      console.log('PM2 and application has been succesfully started.');

      pm2.launchBus((err, bus) => {
        console.log('PM2: Log streaming started.');
        bus.on('log:out', packet => console.log(`App (out): ${packet.process.name} - ${packet.data}`));
        bus.on('log:err', packet => console.error(`App (err): ${packet.process.name} - ${packet.data}`));
      });
    }
  );
});
