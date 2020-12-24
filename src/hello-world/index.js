import controller from './controller';
import resolver, { typeDef } from './resolver';
import service from './service';

export const HelloWorld = { controller, typeDef, resolver, service };

export default controller;
