"use strict";
var path_1 = require('path');
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var errorhandler = require('errorhandler');
var routes_1 = require('./routes');
var Server = (function () {
    function Server() {
        this.app = express();
        this.config();
    }
    Server.bootstrap = function () {
        var dbuser = process.env.DBUSER || 'expressmongoose';
        var dbpassword = process.env.DBPASSWORD || 'expressmongoose';
        var dburl = process.env.DBURL || 'ds031167.mlab.com:31167/expressmongoose-starter-kit';
        var mongodbUri = "mongodb://" + dbuser + ":" + dbpassword + "@" + dburl;
        var options = {
            server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } },
            replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }
        };
        mongoose.connect(mongodbUri, options);
        var conn = mongoose.connection;
        conn.on('error', console.error.bind(console, 'connection error:'));
        conn.once('open', function () { return console.log('Connection Succeeded.'); });
        return new Server();
    };
    Server.prototype.config = function () {
        this.app.set('port', (process.env.PORT || 2999));
        this.app.set('views', path_1.join(__dirname, 'views'));
        this.app.set('view engine', 'pug');
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        this.app.use(cookieParser());
        this.app.use(logger('dev'));
        this.app.use(express.static(path_1.join(__dirname, 'public')));
        this.app.use(routes_1.route);
        this.app.use(errorhandler());
        this.app.use(function (req, res, next) {
            var err = new Error('Not Found');
            err.status = 404;
            next(err);
        });
        this.app.listen(this.app.get('port'), function () {
            console.log('Bootstrap Succeeded.');
        });
    };
    return Server;
}());
var server = Server.bootstrap();
module.exports = server.app;
