'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootValue = exports.schema = undefined;

var _graphql = require('graphql');

const schema = exports.schema = (0, _graphql.buildSchema)(`
  type Query {
    helloWorld: String
  }
`);

const rootValue = exports.rootValue = {
  helloWorld() {
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