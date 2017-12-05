import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';

import { POSTGRES_URL } from '~/env';

const sequelize = new Sequelize(POSTGRES_URL);
const relational = {};

fs.readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== 'index.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file));
    relational[model.name] = model;
  });

Object.keys(relational).forEach(modelName => {
  if ('associate' in relational[modelName]) {
    relational[modelName].associate(relational);
  }
});

relational.sequelize = sequelize;
relational.Sequelize = Sequelize;

export default relational;
