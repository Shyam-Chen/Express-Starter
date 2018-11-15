// @flow

import Sequelize from 'sequelize';

import sequelize from '~/core/sequelize';

export const RelationalList = sequelize.define('List', {
  text: Sequelize.STRING,
});
