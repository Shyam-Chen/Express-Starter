import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'List',
  fields: {
    text: {
      type: GraphQLString,
    }
  }
});
