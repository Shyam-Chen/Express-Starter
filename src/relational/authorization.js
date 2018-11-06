// @flow

export default (sequelize: any, DataTypes: any) => {
  const Authorization = sequelize.define('Authorization', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  return Authorization;
};
