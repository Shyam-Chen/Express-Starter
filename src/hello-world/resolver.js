import { gql } from 'apollo-server-express';

import service from './service';

export const typeDef = gql`
  type Query {
    helloWorld(data: String): String
  }
`;

export default {
  /**
   * @example query { helloWorld }
   * http POST :3000/graphql query="query { helloWorld }"
   * @example query { helloWorld(data: "Express") }
   * http POST :3000/graphql query='query { helloWorld(data: "Express") }'
   */
  Query: {
    helloWorld(parent, args) {
      return service.sayHello(args.data);
    },
  },
};
