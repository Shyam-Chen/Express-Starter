import { buildSchema } from 'graphql';

export const schema = buildSchema(`
  type Query {
    helloWorld: String
  }
`);

export const rootValue = {
  helloWorld() {
    return 'Hello World';
  }
};

// import { GraphQLSchema, GraphQLObjectType } from 'graphql';
//
// import queries from './queries';
// import mutations from './mutations';
//
// export default new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'RootQueryType',
//     fields: queries
//   }),
//   mutation: new GraphQLObjectType({
//     name: 'MutationRootType',
//     fields: mutations
//   })
// });

// -

// import { GraphQLSchema, GraphQLObjectType, GraphQLString } from 'graphql';
//
// const data = {
//   "1": { "id": "1", "name": "Foo" },
//   "2": { "id": "2", "name": "Bar" },
//   "3": { "id": "3", "name": "Baz" }
// };
//
// export const schema = new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//       user: {
//         type: new GraphQLObjectType({
//           name: 'User',
//           fields: {
//             id: { type: GraphQLID },
//             name: { type: GraphQLString },
//           }
//         }),
//         args: {
//           id: { type: GraphQLID }
//         },
//         resolve(_, args) {
//           return data[args.id];
//         }
//       }
//     }
//   })
// });
