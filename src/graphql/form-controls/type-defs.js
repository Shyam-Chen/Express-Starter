import gql from 'graphql-tag';

export const selectTypeDefs = gql`
  type SelectItem {
    id: ID!
    key: Int!
    value: String!
  }

  type Query {
    selectList: [SelectItem]
  }
`;
