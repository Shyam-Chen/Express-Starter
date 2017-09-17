'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _graphqlTools = require('graphql-tools');

var _mergeGraphqlSchemas = require('merge-graphql-schemas');

var _list = require('./list');

var _formControls = require('./form-controls');

const typeDefs = (0, _mergeGraphqlSchemas.mergeTypes)([_list.listTypeDefs, _formControls.selectTypeDefs]);

const resolvers = (0, _mergeGraphqlSchemas.mergeResolvers)([_list.listResolvers, _formControls.selectResolvers]);

exports.default = (0, _graphqlTools.makeExecutableSchema)({ typeDefs, resolvers });