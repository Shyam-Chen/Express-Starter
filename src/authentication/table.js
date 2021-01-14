import Sequelize from 'sequelize';

import sequelize from '~/core/sequelize';

export const UserTable = sequelize.define('User', {
  email: Sequelize.STRING,
  password: Sequelize.STRING,
});
