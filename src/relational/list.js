export default (sequelize, DataTypes) => {
  const List = sequelize.define('list', {
    text: DataTypes.STRING
  });

  return List;
};
