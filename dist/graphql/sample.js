'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const userTypeDefs = exports.userTypeDefs = `
  type User {
    id: ID!
    name: String!
  }

  type Query {
    users: [User]
  }
`;

const userResolvers = exports.userResolvers = {
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