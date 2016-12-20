export class Index {
  ctrl(req, res) {
    res.render('index', {
      title: 'ExpressMongoose Starter Kit'
    });
  }
}
