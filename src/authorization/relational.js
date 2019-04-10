import Sequelize from 'sequelize';

import sequelize from '~/core/sequelize';

export const RelationalUser = sequelize.define('User', {
  username: Sequelize.STRING,
  password: Sequelize.STRING,
  email: Sequelize.STRING,
});
