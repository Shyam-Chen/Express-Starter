'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphqlTools = require('graphql-tools');

var _mergeGraphqlSchemas = require('merge-graphql-schemas');

var _list = require('./list');

var _formControls = require('./form-controls');

var _graphql = require('graphql');

const typeDefs = (0, _mergeGraphqlSchemas.mergeTypes)([_list.listTypeDefs, _formControls.selectTypeDefs]);

const resolvers = (0, _mergeGraphqlSchemas.mergeResolvers)([_list.listResolvers, _formControls.selectResolvers]);

const schema = exports.schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs, resolvers });

// -

exports.default = new _graphql.GraphQLSchema({
  query: new _graphql.GraphQLObjectType({
    name: 'Query',
    fields: () => _extends({}, _list.listQueries)
  }),
  mutation: new _graphql.GraphQLObjectType({
    name: 'Mutation',
    fields: () => _extends({}, _list.listMutations)
  })
});