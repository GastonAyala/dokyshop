'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class color extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      color.belongsToMany(models.product, {
        through: 'colorproducts',
        foreignKey: 'colorId',
        otherKey: 'productId',
        as: 'products'
      })
      
    }
  }
  color.init({
    name: DataTypes.STRING,
    theme: DataTypes.STRING,
    group: DataTypes.STRING,
    hex: DataTypes.STRING,
    rgb: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'color',
  });
  return color;
};