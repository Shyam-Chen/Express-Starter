import { List } from '~/models';

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
