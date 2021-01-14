import { gql } from 'apollo-server-express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { SECRET_KEY } from '~/env';

import { UserColl } from './collection';

export const typeDef = gql`
  type User {
    id: Int!
    username: String!
    email: String!
  }

  type Query {
    profile: User
  }

  type Mutation {
    signup(username: String!, email: String!, password: String!): String
    login(email: String!, password: String!): String
  }
`;

export default {
  Query: {
    async profile(_, args, { user }) {
      if (!user) {
        throw new Error('You are not authenticated!');
      }

      const data = await UserColl.findById(user.id);

      return data;
    },
  },
  Mutation: {
    async signup(_, { username, email, password }) {
      const user = await UserColl.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });

      return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1y' });
    },
    async login(_, { email, password }) {
      const user = await UserColl.findOne({ email });

      if (!user) {
        throw new Error('No user with that email');
      }

      const valid = await bcrypt.compare(password, user.password);

      if (!valid) {
        throw new Error('Incorrect password');
      }

      return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: '1d' });
    },
  },
};
