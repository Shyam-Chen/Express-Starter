import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';

export default new GraphQLObjectType({
  name: 'Foo',
  fields: {
    _id: {
      type: new GraphQLNonNull(GraphQLID)
    },
    postId: {
      type: new GraphQLNonNull(GraphQLID)
    },
    text: {
      type: GraphQLString
    }
  }
});
