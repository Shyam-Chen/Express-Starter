// @flow

import Sequelize from 'sequelize';

import { POSTGRES_URL } from '~/env';

const sequelize = new Sequelize(POSTGRES_URL, {
  dialect: 'postgres',
  logging: false,
  operatorsAliases: Sequelize.Op,  // eslint-disable-line
  sync: { force: true },
});

export default sequelize;
