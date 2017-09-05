'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const selectResolvers = exports.selectResolvers = {
  Query: {
    selectList() {
      return [{ id: 1, key: 1, value: 'Angular' }, { id: 2, key: 2, value: 'React' }, { id: 3, key: 3, value: 'Vue' }];
    }
  }
};