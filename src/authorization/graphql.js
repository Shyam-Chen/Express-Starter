import gql from 'graphql-tag';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { User } from './document';

const typeDefs = gql`
  type User {
    id: Int!
    username: String!
    email: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): String
    login(email: String!, password: String!): String
  }
`;

const resolvers = {
  Query: {
    async me(_, args, { user }) {
      if (!user) {
        throw new Error('You are not authenticated!');
      }

      const data = await User.findById(user.id);

      return data;
    },
  },
  Mutation: {
    async signup(_, { username, email, password }) {
      const user = await User.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });

      return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1y' },
      );
    },
    async login(_, { email, password }) {
      const user = await User.findOne({ where: { email } });

      if (!user) {
        throw new Error('No user with that email');
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error('Incorrect password');
      }

      return jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '1d' },
      );
    },
  },
};

export default { typeDefs, resolvers };
