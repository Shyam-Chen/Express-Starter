// import { buildSchema } from 'graphql';
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

import { GraphQLObjectType, GraphQLSchema } from 'graphql';

import listQueries from './queries';
import listMutations from './mutations';

export const rootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    list: listQueries.list
  })
});

export const rootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: () => ({
    addText: listMutations.addText,
    updateText: listMutations.updateText,
    deleteText: listMutations.deleteText
  })
});

export const schema = new GraphQLSchema({
  query: rootQuery,
  mutation: rootMutation
})
