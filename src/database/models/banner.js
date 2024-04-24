'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      banner.belongsTo(models.view, {
        foreignKey: 'viewId',
        as: 'view'
      })
    }
  }
  banner.init({
    file: DataTypes.STRING,
    title: DataTypes.STRING,
    subtitle: DataTypes.STRING,
    viewId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'banner',
  });
  return banner;
};