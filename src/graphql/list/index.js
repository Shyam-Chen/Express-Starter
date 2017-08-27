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
