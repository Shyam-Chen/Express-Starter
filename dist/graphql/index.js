'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.schema = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _graphql = require('graphql');

var _list = require('./list');

var _graphqlTools = require('graphql-tools');

var _mergeGraphqlSchemas = require('merge-graphql-schemas');

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

// -

const userTypeDefs = `
  type User {
    id: ID!
    name: String!
  }

  type Query {
    users: [User]
  }
`;

const userResolvers = {
  Query: {
    users() {
      const usersById = {
        1: { id: 1, name: 'Angular' },
        2: { id: 2, name: 'React' },
        3: { id: 3, name: 'Vue' }
      };

      return Object.keys(usersById).map(id => usersById[id]);
    }
  }
};

// -

const typeDefs = (0, _mergeGraphqlSchemas.mergeTypes)([userTypeDefs, _list.listTypeDefs]);

const resolvers = (0, _mergeGraphqlSchemas.mergeResolvers)([userResolvers, _list.listResolvers]);

const schema = exports.schema = (0, _graphqlTools.makeExecutableSchema)({ typeDefs, resolvers });