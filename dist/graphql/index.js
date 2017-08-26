'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = exports.rootMutation = exports.rootQuery = undefined;

var _graphql = require('graphql');

var _queries = require('./queries');

var _queries2 = _interopRequireDefault(_queries);

var _mutations = require('./mutations');

var _mutations2 = _interopRequireDefault(_mutations);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const rootQuery = exports.rootQuery = new _graphql.GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    list: _queries2.default.list
  })
}); // import { buildSchema } from 'graphql';
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

const rootMutation = exports.rootMutation = new _graphql.GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addText: _mutations2.default.addText,
    updateText: _mutations2.default.updateText,
    deleteText: _mutations2.default.deleteText
  })
});

const schema = exports.schema = new _graphql.GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation
});