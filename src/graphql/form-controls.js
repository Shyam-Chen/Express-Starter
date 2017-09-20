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

export const selectResolvers = {
  Query: {
    selectList() {
      return [
        { id: 1, key: 1, value: 'Angular' },
        { id: 2, key: 2, value: 'React' },
        { id: 3, key: 3, value: 'Vue' }
      ];
    }
  }
};
