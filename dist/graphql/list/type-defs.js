'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.listTypeDefs = undefined;

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const listTypeDefs = exports.listTypeDefs = _graphqlTag2.default`
  type List {
    _id: ID!
    text: String!
  }

  type Query {
    list: [List]
    list(text: String): [List]
  }

  type Mutation {
    addText(text: String!): List
    updateText(_id: ID!, text: String!): List
    deleteText(_id: ID!): List
  }
`;