import gql from 'graphql-tag';

import { List } from './document';

export const listTypeDefs = gql`
  type List {
    _id: ID!
    text: String!
  }

  type Query {
    list(_id: String, text: String): [List]
  }

  type Mutation {
    addText(text: String!): List
    updateText(_id: ID!, text: String!): List
    deleteText(_id: ID!): List
  }
`;

export const listResolvers = {
  /**
   * @example
   * query {
   *   list { _id text }
   * }
   *
   * query {
   *   list(_id: "${_id}") { _id text }
   * }
   *
   * query {
   *   list(text: "${text}") { _id text }
   * }
   */
  Query: {
    async list(root, { _id, text }) {
      const find = {};

      if (_id) find._id = _id;
      if (text) find.text = { $regex: text, $options: 'i' };

      const data = await List.find(find).exec();

      return data;
    },
  },

  /**
   * @example
   * mutation {
   *   addText(text: "${text}") { _id text }
   * }
   *
   * mutation {
   *   updateText(_id: "${_id}", text: "${text}") { _id text }
   * }
   *
   * mutation {
   *   deleteText(_id: "${_id}") { _id text }
   * }
   */
  Mutation: {
    async addText(root, { text }) {
      const list = await new List({ text });
      const data = await list.save();

      return data;
    },
    async updateText(root, { _id, text }) {
      const conditions = { _id };
      const update = { $set: { text } };
      const options = { new: true, upsert: true };

      const data = await List.findOneAndUpdate(conditions, update, options).exec();

      return data;
    },
    async deleteText(root, { _id }) {
      const data = await List.findByIdAndRemove(_id);
      return data;
    },
  },
};
