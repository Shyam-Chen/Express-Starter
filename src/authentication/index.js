import controller from './controller';
import resolver, { typeDef } from './resolver';
import service from './service';
import { UserColl } from './collection';
import { UserTable } from './table';

export const Authentication = {
  controller,
  typeDef,
  resolver,
  service,
  UserColl,
  UserTable,
};

export default controller;
