// @flow

import gql from 'graphql-tag';  // eslint-disable-line

import document from '~/document';

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
   * {
   *   list { _id text }
   * }
   *
   * {
   *   list(_id: "${_id}") { _id text }
   * }
   *
   * {
   *   list(text: "${text}") { _id text }
   * }
   */
  Query: {
    async list(root: any, { _id, text }: document.List) {
      try {
        const find = {};
        if (_id) find._id = { _id };
        if (text) find.text = { $regex: text, $options: 'i' };
        const data = await document.List.find(find).exec();
        return data;
      } catch (err) {
        throw err;
      }
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
    async addText(root: any, { text }: document.List) {
      try {
        const list = await new document.List({ text });
        const data = await list.save();
        return data;
      } catch (err) {
        throw err;
      }
    },
    async updateText(root: any, { _id, text }: document.List) {
      try {
        const conditions = { _id };
        const update = { $set: { text } };
        const options = { new: true, upsert: true };
        const data = await document.List.findOneAndUpdate(conditions, update, options).exec();
        return data;
      } catch (err) {
        throw err;
      }
    },
    async deleteText(root: any, { _id }: document.List) {
      try {
        const data = await document.List.findByIdAndRemove(_id);
        return data;
      } catch (err) {
        throw err;
      }
    },
  },
};
