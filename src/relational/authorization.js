export default (sequelize, DataTypes) => {
  const Authorization = sequelize.define('Authorization', {
    email: DataTypes.STRING,
    password: DataTypes.STRING
  });

  return Authorization;
};
