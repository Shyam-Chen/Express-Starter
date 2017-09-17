'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectTypeDefs = undefined;

var _graphqlTag = require('graphql-tag');

var _graphqlTag2 = _interopRequireDefault(_graphqlTag);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const selectTypeDefs = exports.selectTypeDefs = _graphqlTag2.default`
  type SelectItem {
    id: ID!
    key: Int!
    value: String!
  }

  type Query {
    selectList: [SelectItem]
  }
`;