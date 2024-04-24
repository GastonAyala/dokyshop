'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class otherImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      otherImage.belongsTo(models.view, {
        foreignKey: 'viewId',
        as: 'view'
      })
    }
  }
  otherImage.init({
    name: DataTypes.STRING,
    viewId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'otherImage',
  });
  return otherImage;
};