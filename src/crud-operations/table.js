import Sequelize from 'sequelize';

import sequelize from '~/core/sequelize';

export const ListTable = sequelize.define('List', {
  text: Sequelize.STRING,
});
