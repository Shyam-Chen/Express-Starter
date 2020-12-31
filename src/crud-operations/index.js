import controller from './controller';
import resolver, { typeDef } from './resolver';
import service from './service';
import { ListColl } from './collection';
import { ListTable } from './table';

export const CrudOperations = {
  controller,
  typeDef,
  resolver,
  service,
  ListColl,
  ListTable,
};

export default controller;
