"use strict";
var Index = (function () {
    function Index() {
    }
    Index.prototype.ctrl = function (req, res) {
        res.render('index', {
            title: 'ExpressMongoose Starter Kit'
        });
    };
    return Index;
}());
exports.Index = Index;
