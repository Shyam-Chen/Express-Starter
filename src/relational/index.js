// @flow

import path from 'path';
import Sequelize from 'sequelize';

import { POSTGRES_URL } from '~/env';

const sequelize = new Sequelize(POSTGRES_URL, {
  dialect: 'postgres',
  logging: false,
  operatorsAliases: Sequelize.Op,  // eslint-disable-line
  sync: { force: true },
});

const List = sequelize.import(path.join(__dirname, './text-list'));

export default {
  sequelize,
  List,
};
