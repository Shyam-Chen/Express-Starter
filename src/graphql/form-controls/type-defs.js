export const selectTypeDefs = `
  type SelectItem {
    id: ID!
    key: Int!
    value: String!
  }

  type Query {
    selectList: [SelectItem]
  }
`;
