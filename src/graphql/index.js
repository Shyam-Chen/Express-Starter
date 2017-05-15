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

// import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList } from 'graphql';
//
// export default new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Query',
//     fields: {
//       list: {
//         type: new GraphQLList(GraphQLString),
//         async resolve({ db }) {
//           const items = await db.collection('list').find().toArray();
//           return items.map(data => `${data.text}`);
//         }
//       }
//     }
//   })
// });


// import { GraphQLSchema, GraphQLObjectType } from 'graphql';
//
// import queries from './queries';
// import mutations from './mutations';
//
// export default new GraphQLSchema({
//   query: new GraphQLObjectType({
//     name: 'Query',
//     fields: queries
//   }),
//   mutation: new GraphQLObjectType({
//     name: 'Mutation',
//     fields: mutations
//   })
// });
