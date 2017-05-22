'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootValue = exports.schema = undefined;

var _graphql = require('graphql');

var schema = exports.schema = (0, _graphql.buildSchema)('\n  type Query {\n    helloWorld: String\n  }\n');

var rootValue = exports.rootValue = {
  helloWorld: function helloWorld() {
    return 'Hello World';
  }
};

// import { GraphQLSchema, GraphQLObjectType } from 'graphql';
//
// import queries from './queries';
// import mutations from './mutations';
//
// export default new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: queries
//   }),
//   mutation: new GraphQLObjectType({
//     name: 'MutationRootType',
//     fields: mutations
//   })
// });