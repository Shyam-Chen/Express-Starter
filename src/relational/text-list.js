// @flow

export default (sequelize: any, DataTypes: any) => {
  const List = sequelize.define('List', {
    text: DataTypes.STRING,
  });

  return List;
};
