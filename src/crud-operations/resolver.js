import { gql } from 'apollo-server-express';

import { ListColl } from './collection';

export const typeDef = gql`
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

export default {
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

      const data = await ListColl.find(find).exec();

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
      const list = await new ListColl({ text });
      const data = await list.save();

      return data;
    },
    async updateText(root, { _id, text }) {
      const conditions = { _id };
      const update = { $set: { text } };
      const options = { new: true, upsert: true };

      const data = await ListColl.findOneAndUpdate(conditions, update, options).exec();

      return data;
    },
    async deleteText(root, { _id }) {
      const data = await ListColl.findByIdAndRemove(_id);
      return data;
    },
  },
};
