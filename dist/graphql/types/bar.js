'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphql = require('graphql');

exports.default = new _graphql.GraphQLObjectType({
  name: 'Bar',
  fields: {
    _id: {
      type: new _graphql.GraphQLNonNull(_graphql.GraphQLID)
    },
    text: {
      type: _graphql.GraphQLString
    }
  }
});