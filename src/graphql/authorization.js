import gql from 'graphql-tag';

export const authorizationTypeDefs = gql`
  type Auth {
    _id: ID!
    email: String!
    password: String!
  }

  type Query {
    authorization: [Auth]
  }
`;

export const authorizationResolvers = {
  Query: {
    authorization() {
      return [
        { email: '', password: '' },
      ];
    },
  },
};
