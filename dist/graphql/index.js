'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.rootQuery = undefined;

var _graphql = require('graphql');

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import { buildSchema } from 'graphql';
//
// export const schema = buildSchema(`
//   type Query {
//     helloWorld: String
//     users: [User!]!
//   }
//
//   type User {
//     id: ID!
//     name: String!
//   }
// `);
//
// const usersById = {
//   1: { id: 1, name: 'foo' },
//   2: { id: 2, name: 'bar' },
//   3: { id: 3, name: 'baz' },
// };
//
// export const rootValue = {
//   helloWorld: () => 'Hello World',
//   users: () => Object.keys(usersById).map(id => usersById[id])
// };

// -

const rootQuery = exports.rootQuery = new _graphql.GraphQLObjectType({
  name: 'Query',
  description: 'Realize Root Query',
  fields: () => ({
    list: _queries2.default.list
  })
});

// export const rootMutation = new GraphQLObjectType({
//   name: 'Mutation',
//   description: 'Realize Root Mutations',
//   fields: () => ({
//     // ...
//   })
// });

const schema = exports.schema = new _graphql.GraphQLSchema({
  query: rootQuery
  // mutation: rootMutation
});