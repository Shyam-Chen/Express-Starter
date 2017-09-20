import gql from 'graphql-tag';

import { List } from '~/models';

export const listTypeDefs = gql`
  type List {
    _id: ID!
    text: String!
  }

  type Query {
    list: [List]
    list(text: String): [List]
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
   *   list {
   *     _id
   *     text
   *   }
   * }
   *
   * {
   *   list(text: "a") {
   *     _id
   *     text
   *   }
   * }
   */
  Query: {
    async list(root, { text }): { text: string } {
      try {
        const find = {};

        if (text) {
          find['text'] = {
            $regex: text,
            $options: 'i'
          };
        }

        return await List.find(find).exec();
      } catch (err) {
        console.error(err);
      }
    }
  },

  /**
   * @example
   * mutation {
   *   addText(text: "Web GO") {
   *     _id
   *     text
   *   }
   * }
   *
   * mutation {
   *   updateText(_id: "599b8fb525b689001eb19183", text: "Web GO") {
   *     _id
   *     text
   *   }
   * }
   *
   * mutation {
   *   deleteText(_id: "599c03f34573776d764dc069") {
   *     _id
   *     text
   *   }
   * }
   */
  Mutation: {
    async addText(root, { text }): { text: string } {
      try {
        const list = await new List({ text });
        return await list.save();
      } catch (err) {
        console.error(err);
      }
    },
    async updateText(root, { _id, text }): { _id: string, text: string } {
      try {
        return await List.findOneAndUpdate(
          { _id },
          { $set: { text } },
          { new: true, upsert: true }
        ).exec();
      } catch (err) {
        console.error(err);
      }
    },
    async deleteText(root, { _id }): { _id: string } {
      try {
        return await List.findByIdAndRemove(_id);
      } catch (err) {
        console.error(err);
      }
    }
  }
};
