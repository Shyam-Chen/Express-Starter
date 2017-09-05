"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
const selectTypeDefs = exports.selectTypeDefs = `
  type SelectItem {
    id: ID!
    key: Int!
    value: String!
  }

  type Query {
    selectList: [SelectItem]
  }
`;