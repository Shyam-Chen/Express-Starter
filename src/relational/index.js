import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import { POSTGRES_URL } from '~/env';

const sequelize = new Sequelize(POSTGRES_URL, {
  dialect: 'postgres',
  logging: false,
  operatorsAliases: Sequelize.Op,
  sync: { force: true },
});

const relational = {};

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== path.basename(__filename)) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    relational[model.name] = model;
  });

Object.keys(relational).forEach((modelName) => {
  if (relational[modelName].associate) {
    relational[modelName].associate(relational);
  }
});

relational.sequelize = sequelize;
relational.Sequelize = Sequelize;

export default relational;
