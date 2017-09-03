import queries from './queries';
import mutations from './mutations';

export const listQueries = {
  list: queries.list
};

export const listMutations = {
  addText: mutations.addText,
  updateText: mutations.updateText,
  deleteText: mutations.deleteText
};

// -

import { List } from '~/models';

export const listTypeDefs = `
  type List {
    _id: ID!
    text: String!
  }

  type Query {
    list: [List]
  }

  type Mutation {
    addText(text: String!): List
    updateText(_id: ID!, text: String!): List
    deleteText(_id: ID!): List
  }
`;

export const listResolvers = {
  Query: {
    async list(root, { text }): { text: string } {
      const find = {};

      if (text) {
        find['text'] = {
          $regex: text,
          $options: 'i'
        };
      }

      return await List.find(find).exec();
    }
  },
  Mutation: {
    async addText(root, { text }): { text: string } {
      const list = await new List({ text });

      return await list.save();
    },
    async updateText(root, { _id, text }): { _id: string, text: string } {
      return await List.findOneAndUpdate(
        { _id },
        { $set: { text } },
        { new: true, upsert: true }
      ).exec();
    },
    async deleteText(root, { _id }): { _id: string } {
      return await List.findByIdAndRemove(_id);
    }
  }
};
